import React from 'react';
import TopAppBar from '../components/header/TopAppBar';
import DetailThread from '../components/main/DetailThread';
import BottomAppBar from '../components/footer/BottomAppBar';

export default function ThreadsPage() {
  return (
    <>
      <TopAppBar />
      <DetailThread />
      <BottomAppBar />
    </>
  );
}
