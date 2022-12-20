import React, {useState} from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import SignInModal from '../modals/SignInModal';
import './Header.css'

const Header = () => {
    const [SignInModalOn, SetSignInModalOn] = useState(false); // 로그인 모달

    const navigate = useNavigate();

    return (
        <>
            <SignInModal 
                show={SignInModalOn} 
                onHide={()=>SetSignInModalOn(false)} 
            />

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
                            <Nav className="ms-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="#" onClick={()=>SetSignInModalOn(true)}>로그인</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" onClick={()=>{navigate('/bfsignup');}}>회원가입</a>
                                </li>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
  );
};

export default Header;