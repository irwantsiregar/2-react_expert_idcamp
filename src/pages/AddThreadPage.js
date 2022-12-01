import React from 'react';
import TopAppBar from '../components/header/TopAppBar';
import AddThread from '../components/main/AddThread';
import BottomAppBar from '../components/footer/BottomAppBar';

export default function AddThreadPage() {
  return (
    <>
      <TopAppBar />
      <AddThread />
      <BottomAppBar />
    </>
  );
}
