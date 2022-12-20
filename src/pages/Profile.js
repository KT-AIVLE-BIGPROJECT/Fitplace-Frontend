import axios from 'axios';
import React from 'react'
import {Container, Button} from 'react-bootstrap'

import Layout from '../layouts/Layout'

const Profile = () => {

  const pressProfileModify = () => {
    window.location.replace('http://localhost:3000/prmodify');
  };

  const token = localStorage.getItem("token");
  console.log("get profile");
  axios
    .get("http://localhost:8000")

  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <div>
          <h5>프로필 화면입니다.</h5>
        </div>
        
        <div>프로필 정보</div>
        <Button variant="primary" type="button" onClick={pressProfileModify}>
          프로필 수정
        </Button>
      </Container>
    </Layout>
  )
}

export default Profile