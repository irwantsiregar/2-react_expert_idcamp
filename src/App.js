import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ThreadsPage from './pages/ThreadsPage';
import LeaderBoardsPage from './pages/LeaderBoardsPage';
import AddThreadPage from './pages/AddThreadPage';
import MyProfilPage from './pages/MyProfilPage';
import NotFoundPage from './pages/NotFoundPage';
import DetailThreadPage from './pages/DetailThreadPage';
import TopAppBar from './components/header/TopAppBar';
import BottomAppBar from './components/footer/BottomAppBar';
import Loading from './components/Loading';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

export default function App() {
  const {
    authUser = null,
    isPreload = false,
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <header>
          <TopAppBar authUser={authUser} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ThreadsPage />} />
            <Route path="/standings" element={<LeaderBoardsPage />} />
            <Route path="/thread/:id" element={<DetailThreadPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<LoginPage />} />
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
        <TopAppBar authUser={authUser} logOut={onLogOut} />
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
