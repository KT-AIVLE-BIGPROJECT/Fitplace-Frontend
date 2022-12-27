import React from 'react'
import axios from 'axios';
import {Container} from 'react-bootstrap'

import Layout from '../layouts/Layout'
import '../css/main.css'
import './DetailBot.css'


const DetailBot = () => {
  //5.복잡도 1주일치, 
  //6.네이버 리뷰들
  function ShowVisitorReview(){
    return "방문자 리뷰 자리"
  }

  function ShowBlogReview(){
    return "블로그 리뷰 자리"
  }

  return(
    <div>
      <div class="left_margin_box">
        <ShowVisitorReview></ShowVisitorReview>
      </div>
      <hr></hr>
      <div class = "left_margin_box">
        <ShowBlogReview></ShowBlogReview>
      </div>
    </div>    
  )
}

export default DetailBot
