import React, {useState, useEffect} from 'react';
import { Button, Col, Form, Row, Container, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import Layout from '../layouts/Layout'
import './DetailPage.css';
import DetailBody from './DetailBody';


const DetailPage = () => {
  const {id} = useParams();
  return (
    <div className='root'>
      <DetailBody></DetailBody> 
    </div>   
  )
}

export default DetailPage