import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Container} from 'react-bootstrap'

import Layout from '../layouts/Layout'
import '../css/main.css'
import './DetailTop.css'
import './DetailBot'
import { useLocation } from 'react-router-dom';

const DetailTop = () => {
  const location = useLocation();
  // 장소 데이터
  const [placeCode, setPlaceCode] = useState(location.state.place_code);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [visitorCnt, setVisitorCnt] = useState(0);
  const [blogCnt, setBlogCnt] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [detailURL, setDetailURL] = useState(""); // 디테일 URL 갖고와야함
  const [reviewSum1, setReviewSum1] = useState("")
  const [reviewSumCnt1, setReviewSumCnt1] = useState("")
  const [reviewSum2, setReviewSum2] = useState("")
  const [reviewSumCnt2, setReviewSumCnt2] = useState("")
  const [reviewSum3, setReviewSum3] = useState("")
  const [reviewSumCnt3, setReviewSumCnt3] = useState("")

  // 혼잡도 관련
  const [nearestHot, setNearestHot] = useState("");
  //const [congestLvl, setConjestLvl] = useState("");
  const [congestIcon, setConjestIcon] = useState("");
  const [congestMessage, setCongestMessage] = useState("혼잡도 파악 중...");
  


  // const maximum = data[0]['review_summary_cnt'];
  // const review_summary = data.map((datum)=>(
  //   {'review_summary':datum['review_summary'],
  //    'review_summary_cnt':datum['review_summary_cnt'],
  //    'review_summary_cnt_percent':datum['review_summary_cnt']/maximum*87 +'%'}
  // ))
  // console.log("review_summary")
  // console.log(review_summary)


  const getCongestion = () => {
    var KEY = "63466d4c516c7373313758755a6d45";

    axios.get(
      `http://openapi.seoul.go.kr:8088/${KEY}/XML/citydata/1/5/${nearestHot}`
    )
    .then((response) => {
      let xml = new DOMParser().parseFromString(response.data, "text/xml");
      setCongestMessage(xml.getElementsByTagName("AREA_CONGEST_LVL")[0].childNodes[0].nodeValue);
      //console.log(xml.getElementsByTagName("AREA_CONGEST_LVL")[0].childNodes[0].nodeValue);
      console.log(congestMessage);
    })
    switch(congestMessage){
      case "보통":
        setConjestIcon('🙂');
        break;
      case "붐빔":
      case "약간 붐빔":
        setConjestIcon('😫');
        break;
      case "매우 붐빔":
        setConjestIcon("😡");
        break;
      case "여유":
        setConjestIcon('😀');
        break;
      default:
        break;
    }

  };


  const ShowTags = (props) => {
    var keywords2 = props.keywords;
    var is_keywords = true;
    var keywords_list;
    console.log(keywords2)

    if(keywords2 != "no result"){
      keywords2 = keywords2.replace('[', '');
      keywords2 = keywords2.replace(']', '');
      keywords2 = keywords2.replace(/\'/g, '');
      keywords2 = keywords2.replace(/\'/g, '');
      keywords_list = keywords2.split(' ', 3);
    } else {
      is_keywords = false;
    }

    if (is_keywords === false){
      return (
        <div>리뷰 요약 키워드 없음</div>
      )
    } else {
        return (
          <div>
            {keywords_list.map((kwd, idx) => {
              return (
                <span className='test' key={idx}>#{kwd} </span>
              )
            })}
          </div>
        )
    }
  }

  // function check_review_summary_exists(){
  //   // '이런 점이 좋았어요' 가 존재할 때
  //   if (Object.keys(review_summary).length){
  //     review_summary_exists = true;
  //     return review_summary_exists
  //   }
  // }
  // function ShowReviewSummary(){
  //   let lis = null;
  //   if (check_review_summary_exists()){

  //   } 
  //   lis = review_summary.map(review => {
  //     return (
  //       // <span className='test'>test</span>
  //       <li className="bar_background">
  //         <div className="bar" style={{width:review['review_summary_cnt_percent']}}></div>
  //         <div className="bar_contents">
  //           <span className="review_summary">{review['review_summary']} </span>
  //           <span className="review_summary_cnt">{review['review_summary_cnt']}</span>
  //         </div>                  
  //       </li>
  //     )
  //   }) 
  //   return lis
  // }


  useEffect(()=>{
    // console.log(placeCode);
    axios
      .get(`http://localhost:8000/places/?place_code=${placeCode}`)
      .then((response)=>{
        setPhoto(response.data.results[0].photo);
        setName(response.data.results[0].name);
        setCategory(response.data.results[0].category);
        setRating(response.data.results[0].rating);
        setVisitorCnt(response.data.results[0].review_visitor_count);
        setBlogCnt(response.data.results[0].review_blog_count);
        setKeywords(response.data.results[0].review_keywords);
        setTel(response.data.results[0].tel);
        setAddress(response.data.results[0].address);
        setDetailURL(`https://pcmap.place.naver.com/restaurant/${placeCode}/review/`)
        setReviewSum1(response.data.results[0].review_summary1);
        setReviewSumCnt1(response.data.results[0].review_summary_cnt1);
        setReviewSum2(response.data.results[0].review_summary2);
        setReviewSumCnt2(response.data.results[0].review_summary_cnt2);
        setReviewSum3(response.data.results[0].review_summary3);
        setReviewSumCnt3(response.data.results[0].review_summary_cnt3);
        setNearestHot(response.data.results[0].nearest_hotplace);
        console.log(response.data.results[0]);
        console.log("AAAA",response.data.results[0].review_keywords)
      });
  }, [])

  useEffect(()=>{
    getCongestion();
  }, [name, congestMessage]);


  return (
    <div>
      <div class='image_box'>
        <img class = '_storejpg' src={photo}></img>
      </div>

      <div class='main'>
        <div class = "title_box">
          <div>
            <span class='_conjest'>
              <div>{congestMessage} {congestIcon}</div>
              {/* <div>혼잡 😫</div> */}
            </span>
          </div>
          <div>
            <span class="title">{name} </span>
            <span class="category">{category}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" class="_star"><path d="M8.26 4.68h4.26a.48.48 0 01.28.87L9.35 8.02l1.33 4.01a.48.48 0 01-.18.54.48.48 0 01-.56 0l-3.44-2.5-3.44 2.5a.48.48 0 01-.74-.54l1.33-4L.2 5.54a.48.48 0 01.28-.87h4.26l1.3-4a.48.48 0 01.92 0l1.3 4z"></path></svg>
          <span>{rating}</span>
          <span>/5 </span>
          <a href="#방문자 리뷰">
            <span class='_blue'>방문자 리뷰 </span>
            <span>{visitorCnt} </span>
          </a>     
          <a href="#블로그 리뷰">
            <span class='_blue'>블로그 리뷰 </span>
            <span>{blogCnt} </span>
          </a>          
          <br></br>
          <ShowTags keywords={keywords}/>
        </div>
        <hr></hr>
        <div class = "left_margin_box">
          <div>
            <span class='_blue'>전화번호 </span>
            <span>{tel}</span>
          </div>
          <div>
            <span class='_blue'>주소 </span>
            <span>{address}</span>
          </div>
          <div>
            <span class="_blue">네이버 지도에서 보기 </span>
            <a href={detailURL} target="_blank" role="button" class="naver_map_link">
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
                {/* <ShowReviewSummary></ShowReviewSummary> */}
                <li class="bar_background">
                  <div class="bar" style={{width:"87%"}}></div>
                  <div class="bar_contents">
                    <span class="review_summary"> "음식이 맛있어요" </span>
                    <span class="review_summary_cnt">591</span>
                  </div>                  
                </li>       
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