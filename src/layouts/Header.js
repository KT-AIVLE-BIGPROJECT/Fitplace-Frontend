import React, {useState} from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import SignInModal from '../modals/SignInModal';
import '../css/main.css'

const Header = () => {
    const [SignInModalOn, SetSignInModalOn] = useState(false);
    return (
        <>
            <SignInModal 
                show={SignInModalOn} 
                onHide={()=>SetSignInModalOn(false)} 
            />

            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand className='title_style' href="/">
                            <img
                                alt=""
                                src={require("../img/fitplace.png")}
                                width="105px"
                                height="53px"
                                className="logo-size z-index"
                            />
                        </Navbar.Brand>
                        {/* <a className='title_style' href="/">
                            <img src={require("../img/fitplace.png")} alt="..." />
                        </a> */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav class="navbar-nav me-auto">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/search">Search</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#!">FAQ</a>
                                </li>
                            </Nav>
                            <Nav className="ms-auto">
                                <Nav.Link>
                                    <Button 
                                        variant='primary'
                                        onClick={()=>SetSignInModalOn(true)}
                                        className='btn btn-warning'
                                    >   
                                        로그인
                                    </Button>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
  );
};

export default Header;