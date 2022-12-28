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
import Board_post from './Board/Board_post';
import Search from './pages/Search';
import BeforeSignUp from './pages/BeforeSignUp';
import Profile from './pages/Profile';
import LikingCheck from './pages/LikingCheck';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy'
import DetailPage from './detailpage/DetailPage';

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
        <Route path="/board/test" element={<Board_post/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/bfsignup" element={<BeforeSignUp/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/liking" element={<LikingCheck/>}></Route>
        <Route path="/tos" element={<TermsOfService/>}></Route>
        <Route path="/privacy" element={<PrivacyPolicy/>}></Route>
        <Route path="/detailpage/:id" element={<DetailPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;