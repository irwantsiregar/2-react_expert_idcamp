import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/SignInPage';
import RegisterPage from './pages/SignUpPage';
import ThreadsPage from './pages/ThreadsPage';
import StandingsPage from './pages/StandingsPage';
import AddThreadPage from './pages/AddThreadPage';
import MyProfilPage from './pages/MyProfilPage';
import DetailThreadPage from './pages/DetailThreadPage';

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/*" element={<ThreadsPage />} />
        <Route path="/add-thread" element={<AddThreadPage />} />
        <Route path="/standings" element={<StandingsPage />} />
        <Route path="/profile" element={<MyProfilPage />} />
        <Route path="/thread/:id" element={<DetailThreadPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </main>
  );
}
