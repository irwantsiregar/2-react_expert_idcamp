import React from 'react';
import TopAppBar from '../components/header/TopAppBar';
import Standings from '../components/main/Standings';
import BottomAppBar from '../components/footer/BottomAppBar';

export default function ThreadsPage() {
  return (
    <>
      <TopAppBar />
      <Standings />
      <BottomAppBar />
    </>
  );
}
