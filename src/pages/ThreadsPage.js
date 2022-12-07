import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadList from '../components/main/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncUpVoteThread, asyncDownVoteThread } from '../states/threads/action';

export default function ThreadsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(() => searchParams.get('keyword') || '');

  const { threads = [], users = [], authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (threadId) => dispatch(asyncUpVoteThread(threadId));

  const onDownVote = (threadId) => dispatch(asyncDownVoteThread(threadId));

  // eslint-disable-next-line no-shadow
  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser,
  })).filter((thread) => (thread.title.toLowerCase().includes(keyword.toLowerCase())));

  return (
    <ThreadList threads={threadsList} upvote={onUpVote} downvote={onDownVote} keyword={keyword} keywordChange={onKeywordChangeHandler} />
  );
}
