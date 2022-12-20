import React, {useState, useEffect} from 'react';
import { Button, Col, Form, Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Layout from '../layouts/Layout';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [toNext, setToNext] = useState(true);

  const navigate = useNavigate();

  const pressSignUp = (event) => {
    event.preventDefault();
    console.log("[Signup.js] ==> pressSignUp called.");
    axios
      .post("http://localhost:8000/users/register/", {
        username: username,
        email: email,
        password: password,
        password2: password2,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201){
          alert("회원가입이 완료되었습니다!");
          //navigate('/');
          window.location.replace('http://localhost:3000/profile');
        } else {
         alert("입력정보를 다시 확인해주세요."); // 예외처리 더 필요할듯
        }
      })
  }

  useEffect(()=>{
    if(username==="" && email==="" && password==="" && password2===""){
      setToNext(true);
    } else {
      setToNext(false);
    }
  })
  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <h3>회원가입</h3>
        <br/>
        <Form onSubmit={pressSignUp}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm>
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="아이디를 입력하세요."
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm>
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="이메일을 입력하세요."
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm>
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm>
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="********"
                      value={password2}
                      onChange={(event) => setPassword2(event.target.value)}
                    />
                </Col>
            </Form.Group>

            <br/>

            <div className="d-grid gap-1">
                <Button variant="secondary" type="submit" disabled={toNext} onClick={pressSignUp}>
                    회원가입
                </Button>
            </div>
        </Form>
      </Container>
    </Layout>
  )
}

export default SignUp