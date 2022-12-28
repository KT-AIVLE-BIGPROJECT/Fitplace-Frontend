import React,{ useState } from 'react'
import { useEffect } from "react";
import axios from 'axios';
import {Container} from 'react-bootstrap'

import Layout from '../layouts/Layout'
import '../css/main.css'
import './DetailBot.css'

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';



const DetailBot = () => {
  //5.복잡도 1주일치, 
  const TEST = [1, 3, 3, 3, 3, 2, 2, 1, 4, 3, 1, 4, 3, 4, 4, 2, 1, 1, 4, 2, 2, 3, 3, 1]
  const data = {
    labels:['H-23', 'H-22', 'H-21', 'H-20', 'H-19', 'H-18', 'H-17', 'H-16', 'H-15', 'H-14', 'H-13', 'H-12', 'H-11', 'H-10', 'H-9', 'H-8', 'H-7', 'H-6', 'H-5', 'H-4', 'H-3', 'H-2', 'H-1', 'H-0'],
    datasets:[
      {
        type:'line',
        label:'지난 24시간의 인구 혼잡도',
        backgroundColor:"rgba(255,0,0,1)",
        data: TEST,
        borderColor: 'red',
      }
    ]
  }
  function ShowCongestion(){
    // return "일주일간 혼잡도 표시 자리"
    return (
    	<div>
        	<Line type="line" data={data} />
      </div>
    );
  }
  

  //6.네이버 리뷰들
  const reviews_visitor =[
    {"review_visitor": "고기 빨리 많이 팔려는건 알겠지만 한참 한명한테 집중해서 이야기중인데 뒤에서 계속 사이에 껴들어서 쳐다보고 빨리먹으라고 눈치주고 뭐하는겁니까. 세트로 두개시키고 추가로 주문하기 전까지 6번은 빨리먹으라고 들은거같네요. 고기도 탄다고 빨리먹으라면서 다른쪽으로 빼둔거 다시 불에 올려놓고ㅋㅋㅋ"},
    {"review_visitor": "구로디지털 고깃집 맛집으로 인정합니다!"},
  ]
  function ShowVisitorReview(){
    const lis = reviews_visitor.map((review)=>{
      return (
        <li className="list-group-item">
          <span>{review["review_visitor"]}</span>
        </li>
        // review["review_blog"]
      )
    })      
    // return "방문자 리뷰 자리"
    return <ul className="list-group">{lis}</ul>
  }

  const reviews_blog =[
    {"review_blog": "고기 빨리 많이 팔려는건 알겠지만 한참 한명한테 집중해서 이야기중인데 뒤에서 계속 사이에 껴들어서 쳐다보고 빨리먹으라고 눈치주고 뭐하는겁니까. 세트로 두개시키고 추가로 주문하기 전까지 6번은 빨리먹으라고 들은거같네요. 고기도 탄다고 빨리먹으라면서 다른쪽으로 빼둔거 다시 불에 올려놓고ㅋㅋㅋ"},
    {"review_blog": "구로디지털 고깃집 맛집으로 인정합니다!"},
  ]
  function ShowBlogReview(){
    const lis = reviews_blog.map((review)=>{
      return (
        <li className="list-group-item">
          <span>{review["review_blog"]}</span>
        </li>
        // review["review_blog"]
      )
    })      
    // return "블로그 리뷰 자리"
    return <ul className="list-group">{lis}</ul>
  }


  return(
    <div>
      <div class="review_box">
        <span className='review_title'>혼잡도 예측</span>
        <div className='review_content'>
          <ShowCongestion></ShowCongestion>
        </div>
      </div>
      <hr></hr>
      
      <div class="review_box">
        <a name="방문자 리뷰"></a>
        <span className='review_title'>방문자 리뷰</span>
          <div className='review_content'>
            <ShowVisitorReview></ShowVisitorReview>
          </div>
      </div>
      <hr></hr>

      <div className='review_box'>
        <a name="블로그 리뷰"></a>
        <span className='review_title'>블로그 리뷰</span>
        <div className='review_content'>
          <ShowBlogReview></ShowBlogReview>
        </div>
      </div>
    </div>    
  )
}
    

export default DetailBot