import React, {useState} from 'react';
import axios from 'axios';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./SignIn.css";

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
        if (response.status < 300) {
          console.log("[SognInModals.js] ==> response arrived");
          console.log(response)
          localStorage.setItem("token", response.data["token"]);
          //localStorage.setItem("username", response.data["username"]);
          navigate("/");
        }
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
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="아이디를 입력해주세요."
                      value={username}
                      onChange={(event)=>setUsername(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                      value={password}
                      onChange={(event)=>setPassword(event.target.value)}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="primary" type="submit" onClick={pressSignIn}>
                로그인
            </Button>
            <Button variant="primary" type="button" onClick={()=>{navigate('/bfsignup');}}>
              회원가입
            </Button>
        </Modal.Footer>
      </Container>
    </Modal>
  )
}

export default SignInModal