import React from 'react'
import axios from 'axios';
import {Container} from 'react-bootstrap'

import Layout from '../layouts/Layout'
import '../css/main.css'
import './DetailTop.css'


const DetailTop = () => {
  // 1.가게사진 
  const jpg_url = 'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220224_94%2F1645683168628PCvEz_JPEG%2F20220113_205201.jpg'
  // 2. 혼잡도, 가게 이름, 카테고리
  let conjestion_message = "붐빔"; 
  const place_name = "떡도리탕";
  const category = "닭볶음탕";
  // 2-2. 별점, 방문자 리뷰, 블로그 리뷰 수
  const rating = 4.47;
  const visitor_review_cnt = 1204;
  const blog_review_cnt = 1565;
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
  const review_summary = {
    'review_summary1': 543,
    'review_summary2': 400,
    'review_summary3': 300,
    'review_summary4': 200,
    'review_summary5': 100,
  }


  function ShowCongestion(){
    let conjest_icon = null;  
    console.log(conjestion_message)
    console.log(typeof conjestion_message)
    switch(conjestion_message){
      case "보통":
        conjest_icon = '🙂';
        conjestion_message = '보통';
        break;
      case "붐빔":
        conjest_icon = '😫';
        conjestion_message = '혼잡';
        break;
      case "매우 붐빔":
        conjest_icon = "😡";
        conjestion_message = "매우 혼잡";
        break;
      default: //여유
        console.log("why?");
        conjest_icon = '😀';
        conjestion_message = '여유';
    }
    return conjest_icon + conjestion_message
  }


  function ShowTags(){
    const lis = []
    for(let key in place_tags){
      lis.push(
        <span>{place_tags[key]} </span>
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
    const lis = [];
    let t = 0;
    if (check_review_summary_exists()){
      for(let key in review_summary){
        // console.log("key : " + key +", value : " + review_summary[key]);
        lis.push(<li key={t}>
          <div> 
            <span>{key} </span>
            <span>{review_summary[key]}</span>
          </div>
        </li>
        )
        t++;
      }
    }  
    return <ul>{lis}</ul>
  }

  const test = "50%"

  return (
    <div>
      <div class='image_box'>
        <img class = '_storejpg' src={jpg_url}></img>
      </div>

      <div class='main'>
        <div class = "title_box">
          <div>
            <span class='_conjest'><ShowCongestion></ShowCongestion></span>
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
          <span class='_blue'>전화번호 </span>
          <span>{phone_num}</span>
          <br/>
          <span class='_blue'>주소 </span>
          <span>{place_address}</span>
          <br/>
          <span class="_blue">네이버 지도에서 보기 </span>
          <a href={naver_link}>네이버 지도</a>
        </div>  
        <hr></hr>

        <div class = "left_margin_box">
          <ShowReviewSummary className='ReviewSummary'></ShowReviewSummary>
        </div>                
        <hr></hr>

        <div class="place_section">
          <div class = "place_section_content">
            <div class = "bar_chart">
              <ul>
                <li class="bar_background">
                  <div class="bar" style={{width:test, background:'rgba(255,164,50,.8)'}}></div>
                  <div class="test4">
                    <span class="test2"> "음식이 맛있어요" </span>
                    <span class="test3">591</span>
                  </div>                  
                </li>

                <li class="bar_background">
                  <div class="bar"></div>
                  <div class="test4">
                    <span class="test2"> "식당이 깨끗해요" </span>
                    <span class="test3">168</span>
                  </div>                
                </li>
              </ul>
            </div>
          </div>            
        </div>
      </div>        
    </div>    
  )
}


export default DetailTop