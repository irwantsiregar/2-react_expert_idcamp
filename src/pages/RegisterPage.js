import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import RegisterInput from '../components/main/authUser/RegisterInput';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const onRegister = async ({ email, name, password }) => {
    const response = await dispatch(asyncRegisterUser({ email, name, password }));
    (response.message) ? setMessage(response.message) : setMessage('success');
  };

  return (
    <RegisterInput register={onRegister} message={message} />
  );
}
