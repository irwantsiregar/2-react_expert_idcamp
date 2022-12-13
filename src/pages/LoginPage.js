import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/main/authUser/LoginInput';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const onLogin = async ({ email, password }) => {
    const response = await dispatch(asyncSetAuthUser({ email, password }));
    (response.message) ? setMessage(response.message) : navigate('/');
  };

  return (
    <LoginInput login={onLogin} message={message} />
  );
}
