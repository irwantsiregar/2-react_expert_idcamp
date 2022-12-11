/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadList from '../components/main/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncUpVoteThread, asyncDownVoteThread } from '../states/threads/action';

export default function ThreadsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(() => searchParams.get('keyword') || '');
  const [category, setCategory] = React.useState(() => searchParams.get('category') || '');
  const [timePosted, setTimePosted] = React.useState(() => searchParams.get('timePosted') || '');

  const { threads = [], users = [], authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVoteThread = (threadId) => dispatch(asyncUpVoteThread(threadId));

  const onDownVoteThread = (threadId) => dispatch(asyncDownVoteThread(threadId));

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const onCategoryChangeHandler = (category) => {
    setCategory(category);
    setSearchParams({ category });
  };

  const onTimePostedChangeHandler = (timePosted) => {
    setTimePosted(timePosted);
    setSearchParams({ timePosted });
  };

  const threadsList = threads.map((thread) => ({
    ...thread,
    authUser,
    user: users.find((user) => user.id === thread.ownerId),
  }))
    .filter((thread) => thread.category.toLowerCase().includes(category.toLowerCase()))
    .sort((ascending, descending) => (
      (timePosted === 'latest')
        ? Date.parse(descending.createdAt) - Date.parse(ascending.createdAt)
        : Date.parse(ascending.createdAt) - Date.parse(descending.createdAt)
    ))
    .filter(({ title }) => title.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <ThreadList
      threads={threadsList}
      upvoteThread={onUpVoteThread}
      downvoteThread={onDownVoteThread}
      keyword={keyword}
      category={category}
      timePosted={timePosted}
      keywordChange={onKeywordChangeHandler}
      categoryChange={onCategoryChangeHandler}
      timePostedChange={onTimePostedChangeHandler}
    />
  );
}
