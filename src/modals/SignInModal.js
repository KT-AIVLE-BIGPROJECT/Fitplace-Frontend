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
        localStorage.setItem("token", response.data["token"]);
        localStorage.setItem("username", username);
        console.log("[SognInModals.js] ==> Login Success");
        window.location.replace('http://localhost:3000/');
      })
      .catch((error) => {
        console.log(error);
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
          <p>
            <img
                alt=""
                src={require("../img/fitplace.png")}
                width="105px"
                height="53px"
                className="logo-size z-index"
            />
          </p><br/><br/>
          <Form>
              <Form.Group className="mb-3">
                {/* <Form.Label>아이디</Form.Label> */}
                <FloatingLabel controlId="floatingInput" label="아이디">
                  <Form.Control
                    type="text"
                    placeholder="아이디를 입력해주세요."
                    value={username}
                    onChange={(event)=>setUsername(event.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                {/* <Form.Label>비밀번호</Form.Label> */}
                <FloatingLabel controlId="floatingInput" label="비밀번호">
                  <Form.Control
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <button class="loginButton" type="submit" onClick={pressSignIn}>
                  로그인
                </button>
              </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <div>아직 회원이 아니신가요?</div>
          <span class="registerButton" onClick={()=>{navigate('/bfsignup');}}>
            회원가입 하기
          </span>
        </Modal.Footer>
      </Container>
    </Modal>
  )
}

export default SignInModal