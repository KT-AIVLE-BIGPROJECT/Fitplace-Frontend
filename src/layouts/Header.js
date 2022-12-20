import React, {useState, useEffect} from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import SignInModal from '../modals/SignInModal';
import './Header.css'

const HeaderRight = (props) => {
    const navigate = useNavigate();
    const [SignInModalOn, SetSignInModalOn] = useState(false); // 로그인 모달

    const logout = () => {
        localStorage.clear(); // 로그아웃 시 로컬 스토리지에 저장된 사용자 정보 모두 지워준다.
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
                        <a class="nav-link" href="#" onClick={()=>{navigate('/profile');}}>프로필</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={logout}>로그아웃</a>
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
                        <a class="nav-link" href="#" onClick={()=>SetSignInModalOn(true)}>로그인</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={()=>{navigate('/bfsignup');}}>회원가입</a>
                    </li>
                </Nav>
            </div>
        )
    }
};

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [welcomeMent, setWelcomeMent] = useState("")

    useEffect(()=>{
      if (localStorage.getItem("token")){
        setIsLogin(true);
        setWelcomeMent(`${localStorage.getItem("username")}님 환영합니다.`)
      } else {
        setIsLogin(false);
        setWelcomeMent("");
      }
    })

    return (
        <>

            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/" className='title_style'>FitPlace</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav class="navbar-nav me-auto">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/search">Search</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/board">FAQ</a>
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