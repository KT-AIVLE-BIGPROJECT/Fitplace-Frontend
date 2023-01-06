import React, {useState, useEffect} from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import nameMasking from '../functions/functions';
import SignInModal from '../modals/SignInModal';
import '../css/main.css'

const HeaderRight = (props) => {
    const navigate = useNavigate();
    const [SignInModalOn, SetSignInModalOn] = useState(false); // 로그인 모달

    // 로그아웃 클릭 함수
    const logout = () => {
        //localStorage.clear(); // 로그아웃 시 로컬 스토리지에 저장된 사용자 정보 모두 지워준다.
        sessionStorage.clear();
        window.location.replace('http://localhost:3000/');
    }

    if (props.isLogin === true){
        return (
            <div>
                <SignInModal 
                    show={SignInModalOn} 
                    onHide={()=>SetSignInModalOn(false)} 
                />
                <Nav className="ms-auto">
                    <li class="nav-item">
                        <a class="nav-link fw-bold pointer" href="#" onClick={()=>{navigate('/profile');}}>프로필</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fw-bold pointer" href="#" onClick={logout}>로그아웃</a>
                    </li>
                </Nav>
            </div>
        )
    } else{
        return (
            <div>
                <SignInModal 
                    show={SignInModalOn} 
                    onHide={()=>SetSignInModalOn(false)} 
                />
                <Nav className="ms-auto">
                    <li class="nav-item">
                        <a class="nav-link fw-bold pointer" onClick={()=>SetSignInModalOn(true)}>로그인</a>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link" href="#" onClick={()=>{navigate('/bfsignup');}}>회원가입</a>
                    </li> */}
                </Nav>
            </div>
        )
    }
};

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [welcomeMent, setWelcomeMent] = useState("")

    // ----------------------------- [ 함수 ] -----------------------------
    const getProfile = (token) => {
        axios
        .get("http://localhost:8000/users/profile/", {
          headers: {
            "Authorization": `Token ${token}`
          }
        })
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("nickname", response.data.nickname);
        })
        .then(()=>{
            setWelcomeMent(`${nameMasking(sessionStorage.getItem("nickname"))}님 환영합니다.`);
        })
    };

    // ----------------------------- [ useEffect ] -----------------------------
    useEffect(()=>{
      if (sessionStorage.getItem("token")){
        setIsLogin(true);
        getProfile(sessionStorage.getItem("token"));
        // setWelcomeMent(`${nameMasking(sessionStorage.getItem("nickname"))}님 환영합니다.`)
      } else {
        setIsLogin(false);
        setWelcomeMent("");
      }
    })

    return (
        <>

            <header>
                <Navbar expand="lg" fixed="top" className='backdrop main-navbar'>
                    <Container style={{'min-width':'720px'}}>
                        <Navbar.Brand className='title_style' href="/">
                            <img
                                alt=""
                                src={require("../img/fitplace.png")}
                                width="105px"
                                height="53px"
                                className="logo-size z-index"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav class="navbar-nav me-auto">
                                <li class="nav-item">
                                    <a class="nav-link fw-bold" href="/search">장소추천<img className="location-img" src ={require("../img/find-location.png")} /></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link fw-bold" href="/board">자유게시판</a>
                                </li>
                            </Nav>
                            <Nav>{welcomeMent}</Nav>
                            <HeaderRight isLogin={isLogin}/>
                            {/* <Nav className="ms-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="#" onClick={()=>SetSignInModalOn(true)}>로그인</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" onClick={()=>{navigate('/bfsignup');}}>회원가입</a>
                                </li>
                            </Nav> */}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
  );
};

export default Header;