import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Main from './Main/Main';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import Search from './pages/Search';
import BeforeSignUp from './pages/BeforeSignUp';
import Profile from './pages/Profile';
import ProfileModify from './pages/ProfileModify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/board" element={<Board/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/bfsignup" element={<BeforeSignUp/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/prmodify" element={<ProfileModify/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;