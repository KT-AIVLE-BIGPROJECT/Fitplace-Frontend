import React, {useState, useEffect} from 'react';
import { Button, Col, Form, Row, Container, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import Layout from '../layouts/Layout'
import './DetailPage.css';
import DetailTop from './DetailTop'
import DetailBot from './DetailBot'


const DetailPage = () => {
  const {id} = useParams();
  return (        
    <Layout>
      <Container className='container_style' style={{minHeight: "75wh"}}>
        <DetailTop></DetailTop>
        <DetailBot></DetailBot>
      </Container>
    </Layout>
  )
}

export default DetailPage