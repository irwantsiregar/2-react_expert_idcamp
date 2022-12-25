import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderBoards from '../components/main/LeaderBoards';
import { asyncReceiveLeaderBoards } from '../states/leaderboards/action';

export default function LeaderBoardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderBoards());
  }, [dispatch]);

  return (
    <LeaderBoards leaderboards={leaderboards} />
  );
}
