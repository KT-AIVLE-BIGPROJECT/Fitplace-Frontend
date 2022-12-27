import React, { useState } from 'react'
import axios from 'axios';
import {Container} from 'react-bootstrap'

import Layout from '../layouts/Layout'
import '../css/main.css'
import './DetailTop.css'


const DetailTop = () => {
  // 1.가게사진 
  const jpg_url = 'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220224_94%2F1645683168628PCvEz_JPEG%2F20220113_205201.jpg'
  // 2. 혼잡도, 가게 이름, 카테고리
  const [conjestion_message, setConjestion_message] = useState("붐빔");
  const [place_name, setPlace_name] = useState("떡도리탕");
  const [category, setCategory] = useState('닭볶음탕');
  // 2-2. 별점, 방문자 리뷰, 블로그 리뷰 수
  const [rating, setRating] = useState(4.47);
  const [visitor_review_cnt, setVisitor_review_cnt] = useState(1204);
  const [blog_review_cnt, setBlog_review_cnt] = useState(1565);
  // 2-3. 가게 태그(키워드)
  const place_tags = {
    'tag1': '#tag1',
    'tag2': '#tag2',
  }
  //3. 전화번호, 주소, 네이버 지도 링크
  const phone_num = "0507-1352-2940";
  const place_address = "서울 강남구 테헤란로1길 28-9 1층";
  const naver_link = 'https://pcmap.place.naver.com/restaurant/34461836/review/';
  //4. 네이버 리뷰 요약
  let review_summary_exists = false;
  const data = [
    {'review_summary': '"음식이 맛있어요"',
     'review_summary_cnt':543},
    {'review_summary': '"식당이 깨끗해요"',
     'review_summary_cnt':400},
    {'review_summary':'"test3"',
     'review_summary_cnt':200}
  ];
  const maximum = data[0]['review_summary_cnt'];
  const review_summary = data.map((datum)=>(
    {'review_summary':datum['review_summary'],
     'review_summary_cnt':datum['review_summary_cnt'],
     'review_summary_cnt_percent':datum['review_summary_cnt']/maximum*87 +'%'}
  ))
  // console.log("review_summary")
  // console.log(review_summary)


  function ShowCongestion(){
    let conjest_icon = null;  
    let message = null;
    // console.log(conjestion_message)
    // console.log(typeof conjestion_message)
    switch(conjestion_message){
      case "보통":
        conjest_icon = '🙂';
        message = '보통';
        break;
      case "붐빔":
        conjest_icon = '😫';
        message = '혼잡';
        break;
      case "매우 붐빔":
        conjest_icon = "😡";
        message = "매우 혼잡";
        break;
      default: //여유
        conjest_icon = '😀';
        message = '여유';
    }
    return conjest_icon + message
  }


  function ShowTags(){
    const lis = []
    for(let key in place_tags){
      lis.push(
        <span className='test'>{place_tags[key]} </span>
      )
    }
    return lis
  }

  function check_review_summary_exists(){
    // '이런 점이 좋았어요' 가 존재할 때
    if (Object.keys(review_summary).length){
      review_summary_exists = true;
      return review_summary_exists
    }
  }
  function ShowReviewSummary(){
    let lis = null;
    if (check_review_summary_exists()){

    } 
    lis = review_summary.map(review => {
      return (
        // <span className='test'>test</span>
        <li className="bar_background">
          <div className="bar" style={{width:review['review_summary_cnt_percent']}}></div>
          <div className="bar_contents">
            <span className="review_summary">{review['review_summary']} </span>
            <span className="review_summary_cnt">{review['review_summary_cnt']}</span>
          </div>                  
        </li>
      )
    }) 
    return lis
  }


  return (
    <div>
      <div class='image_box'>
        <img class = '_storejpg' src={jpg_url}></img>
      </div>

      <div class='main'>
        <div class = "title_box">
          <div>
            <span class='_conjest'>
              <ShowCongestion></ShowCongestion>
            </span>
          </div>
          <div>
            <span class="title">{place_name} </span>
            <span class="category">{category}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" class="_star"><path d="M8.26 4.68h4.26a.48.48 0 01.28.87L9.35 8.02l1.33 4.01a.48.48 0 01-.18.54.48.48 0 01-.56 0l-3.44-2.5-3.44 2.5a.48.48 0 01-.74-.54l1.33-4L.2 5.54a.48.48 0 01.28-.87h4.26l1.3-4a.48.48 0 01.92 0l1.3 4z"></path></svg>
          <span>{rating}</span>
          <span>/5 </span>
          <span class='_blue'>방문자 리뷰 </span>
          <span>{visitor_review_cnt} </span>
          <span class='_blue'>블로그 리뷰 </span>
          <span>{blog_review_cnt} </span>
          <br></br>
          <div>
            <ShowTags></ShowTags>
          </div>          
        </div>
        <hr></hr>
        
        <div class = "left_margin_box">
          <div>
            <span class='_blue'>전화번호 </span>
            <span>{phone_num}</span>
          </div>
          <div>
            <span class='_blue'>주소 </span>
            <span>{place_address}</span>
          </div>
          <div>
            <span class="_blue">네이버 지도에서 보기 </span>
            <a href={naver_link} target="_blank" role="button" class="naver_map_link">
              {/* <i class="naver_logo"></i> */}
              네이버 지도
            </a>
          </div>
        </div>  
        <hr></hr>

        <div class="place_section">
          <div class="place_section_title">
            <span>"방문하신 분들이 뽑은 장점"</span> 
          </div>
          <div class = "place_section_content">
            <div class = "bar_chart">
              <ul>
                <ShowReviewSummary></ShowReviewSummary>
                {/* <li class="bar_background">
                  <div class="bar" style={{width:"87%"}}></div>
                  <div class="bar_contents">
                    <span class="review_summary"> "음식이 맛있어요" </span>
                    <span class="review_summary_cnt">591</span>
                  </div>                  
                </li> */}            
              </ul>
            </div>
          </div>            
        </div>
      <hr></hr>

        
      </div>        
    </div>    
  )
}


export default DetailTop