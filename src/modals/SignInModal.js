import React from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import "../css/main.css";

const SignInModal = ({ show, onHide }) => {
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
                    <Form.Control placeholder="아이디" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호" />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>

            <Button variant="primary" type="button" className='btn btn-secondary'>
              로그인
            </Button>
            <Button variant="primary" type="button" href='/liking' className='btn btn-secondary'>
              회원가입
            </Button>
         
        </Modal.Footer>
      </Container>
    </Modal>
  )
}

export default SignInModal