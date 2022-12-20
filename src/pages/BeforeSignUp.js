import React, {useState, useEffect} from 'react';
import { Button, Col, Form, Row, Container, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Layout from '../layouts/Layout'
  
const BeforeSignUp = () => {
  const [allCheck, setAllCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [toNext, setToNext] = useState(true);

  const navigate = useNavigate();

  const pressAll = () => {
    if (allCheck === false){
        setAllCheck(true);
        setCheck1(true);
        setCheck2(true);
    } else {
        setAllCheck(false);
        setCheck1(false);
        setCheck2(false);
    }
  }
  const pressCheck1 = () => {
    if (check1 === false){
        setCheck1(true);
    } else {
        setCheck1(false);
    }
  }
  const pressCheck2 = () => {
    if (check2 === false){
        setCheck2(true);
    } else {
        setCheck2(false);
    }
  }

  useEffect(()=>{
    if (check1===true && check2===true){
        setAllCheck(true);
        setToNext(false);
    } else{
        setAllCheck(false);
        setToNext(true);
    }
  }, [check1, check2])

  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <h3>이용약관</h3>
        <Form>
            <Form.Check
                type="checkbox"
                label="전체 동의"
                checked={allCheck}
                onChange={pressAll}
            /><br/>
            <div>
                <p>이용약관 안내</p>
                <p>내용</p>
                <Form.Check
                    type="checkbox"
                    label="이용약관 동의(필수)"
                    checked={check1}
                    onChange={pressCheck1}
                />
            </div>
            <br/>
            <div>
                <p>개인정보 수집 및 이용에 대한 안내</p>
                <p>내용</p>
                <Form.Check
                    type="checkbox"
                    label="개인정보 수집 및 이용에 대한 안내(필수)"
                    checked={check2}
                    onChange={pressCheck2}
                />
            </div>
            <Button variant="secondary" type="button" onClick={()=>{navigate('/');}}>
              취소
            </Button>
            <Button variant="secondary" type="button" disabled={toNext} onClick={()=>{navigate('/signup');}}>
              다음
            </Button>
        </Form>
      </Container>
    </Layout>
  )
}

export default BeforeSignUp



// const [show, setShow] = useState(false); // 개인정보 수집 동의 모달

// // 모달 컨트롤러
// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);
{/* <Button variant="link" onClick={handleShow}>이용약관 동의</Button>
<Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
    <Modal.Title>이용약관</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <p>이용약관 안내(스크롤바로 구성하기)</p>
            <Form.Check type="checkbox" label="이용약관 동의(필수)" />
            <p>개인정보 수집 및 이용에 대한 안내 (스크롤바로 구성하기)</p>
            <Form.Check type="checkbox" label="개인정보 수집 및 이용에 대한 안내(필수)" />
        </Form>
    </Modal.Body>

    <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
        취소
    </Button>
    <Button variant="primary" onClick={handleClose}>
        확인
    </Button>
    </Modal.Footer>
</Modal> */}