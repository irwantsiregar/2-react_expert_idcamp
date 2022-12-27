import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RegisterPage from './pages/RegisterPage';
import ThreadsPage from './pages/ThreadsPage';
import LeaderBoardsPage from './pages/LeaderBoardsPage';
import AddThreadPage from './pages/AddThreadPage';
import MyProfilPage from './pages/MyProfilPage';
import DetailThreadPage from './pages/DetailThreadPage';
import TopAppBar from './components/header/TopAppBar';
import BottomAppBar from './components/footer/BottomAppBar';
import Loading from './components/Loading';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncSetAuthUser, asyncUnsetAuthUser } from './states/authUser/action';

export default function App() {
  const {
    authUser = null,
    isPreload = false,
  } = useSelector((states) => states);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    const response = await dispatch(asyncSetAuthUser({ email, password }));
    (response.message) ? setMessage(response.message) : navigate('/');
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <header>
          <TopAppBar authUser={authUser} login={onLogin} message={message} logOut={() => { }} />
        </header>
        <main>
          <Routes>
            <Route path="/*" element={<ThreadsPage />} />
            <Route path="/standings" element={<LeaderBoardsPage />} />
            <Route path="/thread/:id" element={<DetailThreadPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <footer>
          <BottomAppBar authUser={authUser} />
        </footer>
      </>
    );
  }

  return (
    <>
      <Loading />
      <header>
        <TopAppBar authUser={authUser} logOut={onLogOut} login={() => { }} />
      </header>
      <main>
        <Routes>
          <Route path="/*" element={<ThreadsPage />} />
          <Route path="/standings" element={<LeaderBoardsPage />} />
          <Route path="/thread/:id" element={<DetailThreadPage />} />
          <Route path="/add-thread" element={<AddThreadPage />} />
          <Route path={`/${authUser.name.toLowerCase().split(' ').join('-')}`} element={<MyProfilPage />} />
        </Routes>
      </main>
      <footer>
        <BottomAppBar authUser={authUser} />
      </footer>
    </>
  );
}
