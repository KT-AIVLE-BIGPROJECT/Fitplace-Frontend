import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Main from './Main/Main';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import Board_detail from './Board/Board_detail';
import Board_edit from './Board/Board_edit';
import Board_write from './Board/Board_write';
import Board_page from './Board/Board_page';
import Search from './pages/Search';
import BeforeSignUp from './pages/BeforeSignUp';
import Profile from './pages/Profile';
import KeywordModify from './pages/KeywordModify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/board" element={<Board/>}></Route>
        <Route path="/board/detail" element={<Board_detail/>}></Route>
        <Route path="/board/edit" element={<Board_edit/>}></Route>
        <Route path="/board/write" element={<Board_write/>}></Route>
        <Route path="/board/page" element={<Board_page/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/bfsignup" element={<BeforeSignUp/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/kerword" element={<KeywordModify/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;