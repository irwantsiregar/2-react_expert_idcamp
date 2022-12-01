import React from 'react';
import TopAppBar from '../components/header/TopAppBar';
import Profile from '../components/main/Profile';
import BottomAppBar from '../components/footer/BottomAppBar';

export default function MyProfilPage() {
  return (
    <>
      <TopAppBar />
      <Profile />
      <BottomAppBar />
    </>
  );
}
