import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Main from './Main/Main';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import Search from './pages/Search';
import BeforeSignUp from './pages/BeforeSignUp';

function App() {
  localStorage.setItem("isLogin", true);
  const [isLogin, setIsLogin] = useState("false");

  useEffect(()=>{
    if (localStorage.getItem("isLogin") === true){
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  },)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/board" element={<Board/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/bfsignup" element={<BeforeSignUp/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;