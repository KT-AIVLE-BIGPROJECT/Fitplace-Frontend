import React, {useState} from 'react';
import axios from 'axios';
import { Modal, Button, Form, Container, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./SignInModal.css";
// import "./SignIn.css";

const SignInModal = ({ show, onHide }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [isActive,setIsActive] = useState(false);
  const [loginRight,setLoginRight] = useState(true);

  const ActiveIsPassedLogin = () =>{
    return username.length>0 && password.length>7
    ? setIsActive(true):setIsActive(false);
  }
  const handleUsername = e => {
    setUsername(e.target.value);
  };
  const handlePw = e => {
    setPassword(e.target.value);
  };

  const pressSignIn = (event) => {
    event.preventDefault();
    console.log("[SignInModal.js] ==> pressSignIn called.");
    axios
      .post("http://localhost:8000/users/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        //localStorage.clear();
        // 로컬스토리지에 저장하면 무조건 로그아웃 직접 해줘야 함
        // localStorage.setItem("token", response.data["token"]);
        // localStorage.setItem("username", username);
        sessionStorage.setItem("token", response.data["token"]);
        sessionStorage.setItem("username", username);
        console.log("[SognInModals.js] ==> Login Success");
        window.location.replace('http://localhost:3000/');
      })
      .catch((error) => {
        console.log(error);
        setLoginRight(false);
      })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='login-margin-top'>
            <img
                alt=""
                src={require("../img/fitplace.png")}
                width="105px"
                height="53px"
                className="logo-size z-index"
            />
          </div>
          <div className='login-margin-top login-form'>
            <Form>
              <Form.Group className="mb-3">
                  {/* <Form.Label>아이디</Form.Label> */}
                  <FloatingLabel controlId="floatingInput" label="아이디" className='fw-light'>
                    <Form.Control
                      type="text"
                      placeholder="아이디를 입력해주세요."
                      value={username}
                      onKeyUp={ActiveIsPassedLogin}
                      onChange={handleUsername}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  {/* <Form.Label>비밀번호</Form.Label> */}
                  <FloatingLabel controlId="floatingInput" label="비밀번호" className='fw-light'>
                    <Form.Control
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                      value={password}
                      onKeyUp={ActiveIsPassedLogin}
                      onChange={handlePw}
                    />
                  </FloatingLabel>
                </Form.Group>
                <div className={loginRight? 'loginError loginRigth':'loginError loginWrong'}>아이디 및 비밀번호를 확인하세요.</div>
                <Form.Group>
                  <button class="loginButton login-margin-top" className={isActive? 'loginButton login-margin-top activeBtn':'loginButton login-margin-top unactiveBtn'} type="submit" onClick={pressSignIn}
                  disabled={username===''||password.length<8 ?true:false}>
                    로그인
                  </button>
                </Form.Group>
            </Form>
          </div>
          
        </Modal.Body>

        <Modal.Footer className='loginFooter'>
          <div>아직 회원이 아니신가요?</div>
          <span class="registerButton pointer" onClick={()=>{window.location.href='/bfsignup'}}>
            회원가입 하기
          </span>
        </Modal.Footer>
      </Container>
    </Modal>
  )
}

export default SignInModal