import React from 'react';
import { useSelector } from 'react-redux';
import Profile from '../components/main/Profile';

export default function MyProfilPage() {
  const { authUser } = useSelector((states) => states);

  return (
    <Profile {...authUser} />
  );
}
