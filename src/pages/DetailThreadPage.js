import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/main/ThreadDetail';
import {
  asyncAddCommentThread, asyncUpVoteThread, asyncDownVoteThread,
  asyncReceiveThreadDetail, asyncUpVoteCommentThread, asyncDownVoteCommentThread,
} from '../states/threadDetail/action';

export default function ThreadsPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const commentThread = async (content) => {
    const response = await dispatch(asyncAddCommentThread({ id, content }));
    // eslint-disable-next-line no-restricted-globals
    (response.message) ? setMessage(response.message) : history.go();
  };

  const onUpVoteThread = (threadId) => dispatch(asyncUpVoteThread(threadId));

  const onDownVoteThread = (threadId) => dispatch(asyncDownVoteThread(threadId));

  const onUpVoteCommentThread = (threadId, commentId) => dispatch(asyncUpVoteCommentThread(threadId, commentId));

  const onDownVoteCommentThread = (threadId, commentId) => dispatch(asyncDownVoteCommentThread(threadId, commentId));

  const vote = {
    upVoteThread: onUpVoteThread,
    downVoteThread: onDownVoteThread,
    upVoteCommentThread: onUpVoteCommentThread,
    downVoteCommentThread: onDownVoteCommentThread,
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <ThreadDetail
      {...threadDetail}
      authUser={authUser}
      vote={vote}
      message={message}
      addComment={commentThread}
    />
  );
}
