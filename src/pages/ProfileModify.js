import React from 'react'
import {Container} from 'react-bootstrap'

import Layout from '../layouts/Layout'

const ProfileModify = () => {
  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
      <div>
        <div className='h_row_center'>
            <h4>프로필 수정 화면입니다.</h4>
        </div>
        <h5>음식점</h5>
        <div className='margin_box'>
            <div className='h_row'>
                <div className='items4'>
                    <img className="hansik-logo" src="img/hansik.jpg" />
                    <span>한식</span>
                </div>
                <div className='items4'>
                    <img className="hansik-logo" src="img/hansik.jpg" />
                    <span>양식</span>
                </div>
                <div className='items4'>
                    <img className="hansik-logo" src="img/hansik.jpg" />
                    <span>중식</span>
                </div>
                <div className='items4'>
                    <img className="hansik-logo" src="img/hansik.jpg" />
                    <span>일식</span>
                </div> 
            </div>
        </div>
        <h5>카페</h5>
        <div className='margin_box'>
            <div className='h_row'>
                <div className='items4'>
                    <img className="hansik-logo" src="img/coffee.png" />
                    <span>카페</span>
                </div>
                <div className='items4'>
                    <img className="hansik-logo" src="img/coffee.png" />
                    <span>디저트카페</span>
                </div>
                <div className='items4'>
                    <img className="hansik-logo" src="img/coffee.png" />
                    <span>베이커리</span>
                </div>
            </div>
        </div>
    </div>
      </Container>
    </Layout>
  )
}

export default ProfileModify