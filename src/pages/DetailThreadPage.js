import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/main/ThreadDetail';
import { asyncAddCommentThread, asyncReceiveThreadDetail } from '../states/threadDetail/action';

export default function ThreadsPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const commentThread = (content) => {
    dispatch(asyncAddCommentThread({ id, content }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <ThreadDetail authUser={authUser} {...threadDetail} addComment={commentThread} />
  );
}
