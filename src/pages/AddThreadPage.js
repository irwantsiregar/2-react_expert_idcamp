import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddThread from '../components/main/AddThread';
import { asyncAddThread } from '../states/threads/action';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

export default function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = async ({ title, body, category }) => {
    const response = await dispatch(asyncAddThread({ title, body, category }));
    console.log(response);
    (response.message) ? setMessage(response.message) : navigate('/');
  };

  return (
    <AddThread addThread={onAddThread} message={message} />
  );
}
