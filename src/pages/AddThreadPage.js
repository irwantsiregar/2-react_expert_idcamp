import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddThread from '../components/main/AddThread';
import { asyncAddThread } from '../states/threads/action';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

export default function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <AddThread addThread={onAddThread} />
  );
}
