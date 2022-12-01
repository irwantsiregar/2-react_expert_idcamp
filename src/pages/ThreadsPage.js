import React from 'react';
import TopAppBar from '../components/header/TopAppBar';
import ThreadList from '../components/main/ThreadList';
import BottomAppBar from '../components/footer/BottomAppBar';

export default function ThreadsPage() {
  return (
    <>
      <TopAppBar />
      <ThreadList />
      <BottomAppBar />
    </>
  );
}
