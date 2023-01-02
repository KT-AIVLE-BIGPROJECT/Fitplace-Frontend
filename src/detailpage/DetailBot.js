import React,{ useState } from 'react'
import { useEffect } from "react";
import axios from 'axios';

import Layout from '../layouts/Layout'
import '../css/main.css'
import './DetailBot.css'

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';



const DetailBot = () => {
  const location = useLocation();
  const getPath = location.pathname.split('/')
  const [placeCode, setPlaceCode] = useState(getPath[getPath.length-1]); // URL에서 장소코드 받아옴
  const [review1, setReview1] = useState("");
  const [review2, setReview2] = useState("");
  const [review3, setReview3] = useState("");
  const [review4, setReview4] = useState("");
  const [review5, setReview5] = useState("");
  const [review6, setReview6] = useState("");
  const [review7, setReview7] = useState("");
  const [review8, setReview8] = useState("");
  const [review9, setReview9] = useState("");
  const [review10, setReview10] = useState("");

  //5.복잡도 1주일치, 
  // const TEST = [1, 3, 3, 3, 3, 2, 2, 1, 4, 3, 1, 4, 3, 4, 4, 2, 1, 1, 4, 2, 2, 3, 3, 1]
  const TEST = {
    'H-23': 1,
    'H-22': 3,
    'H-21': 3,
    'H-20': 3,
    'H-19': 3,
    'H-18': 2,
    'H-17': 2,
    'H-16': 1,
    'H-15': 4,
    'H-14': 3,
    'H-13': 1,
    'H-12': 4,
    'H-11': 3,
    'H-10': 4,
    'H-9': 4,
    'H-8': 2,
    'H-7': 1,
    'H-6': 1,
    'H-5': 4,
    'H-4': 2,
    'H-3': 2,
    'H-2': 3,
    'H-1': 3,
    'H-0': 1
  }
  const predict = {
    "H-0": 3,
    "H+1": 4,
    "H+2": 5,
  }
  const data = {
    // labels:['H-23', 'H-22', 'H-21', 'H-20', 'H-19', 'H-18', 'H-17', 'H-16', 'H-15', 'H-14', 'H-13', 'H-12', 'H-11', 'H-10', 'H-9', 'H-8', 'H-7', 'H-6', 'H-5', 'H-4', 'H-3', 'H-2', 'H-1', 'H-0'],
    datasets:[
      {
        type:'line',
        label:'지난 24시간의 인구 혼잡도',
        backgroundColor:"rgba(255,0,0,1)",
        data: TEST,
        borderColor: 'red',
      },
      {
        type:'line',
        label:"예측",
        data: predict,
        backgroundColor:"rgba(0,0,255,1)",
        borderColor: 'blue',
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
  

  // //6.네이버 리뷰들
  // const reviews_visitor =[
  //   {"review_visitor": "고기 빨리 많이 팔려는건 알겠지만 한참 한명한테 집중해서 이야기중인데 뒤에서 계속 사이에 껴들어서 쳐다보고 빨리먹으라고 눈치주고 뭐하는겁니까. 세트로 두개시키고 추가로 주문하기 전까지 6번은 빨리먹으라고 들은거같네요. 고기도 탄다고 빨리먹으라면서 다른쪽으로 빼둔거 다시 불에 올려놓고ㅋㅋㅋ"},
  //   {"review_visitor": "구로디지털 고깃집 맛집으로 인정합니다!"},
  // ]
  function ShowVisitorReview(){
    var visitors = [
      review1,
      review2,
      review3,
      review4,
      review5,
      review6,
      review7,
      review8,
      review9,
      review10
    ];
    return (
      <ul className='list-group'>
        {visitors.map((visitor, idx) => {
          if(visitor != ""){
            return (
              <li key={idx} className="list-group-item">
                <div>{idx+1}.</div>
                <span>{visitor}</span>
              </li>
            )
          }
        })}
      </ul>
    )
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

  useEffect(()=>{
    axios
      .get(`http://localhost:8000/places/?place_code=${placeCode}`)
      .then((response)=>{
        setReview1(response.data.results[0].review1);
        setReview2(response.data.results[0].review2);
        setReview3(response.data.results[0].review3);
        setReview4(response.data.results[0].review4);
        setReview5(response.data.results[0].review5);
        setReview6(response.data.results[0].review6);
        setReview7(response.data.results[0].review7);
        setReview8(response.data.results[0].review8);
        setReview9(response.data.results[0].review9);
        setReview10(response.data.results[0].review10);
      })
  }, [])

  // const [y_test_1hour, setY_test_1hour] = useState();
  // const [y_test_2hour, setY_test_2hour] = useState();

  // function Test(){
  //   axios
  //     .get("http://localhost:8000/test/")
  //     .then((response)=>{
  //       setY_test_1hour(response.data.y_test_1hour);
  //       setY_test_2hour(response.data.y_test_2hour);
  //     })
  //     console.log(response.data.y_test_1hour);
  //     console.log(response.data.y_test_2hour);
  //     return (
  //       <div>
  //         <span>{y_test_1hour}</span>
  //         <span>{y_test_2hour}</span>
  //       </div>
  //     )
  // }

  return(
    <div>
      <div class="review_box">
        {/* <Test></Test> */}
      </div>
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