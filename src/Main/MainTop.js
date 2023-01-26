import React, { useEffect, useState } from 'react'
import "../css/main.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Swiper, SwiperSlide } from "swiper/react" // basic
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { Container } from 'react-bootstrap';

SwiperCore.use([Navigation, Pagination, Autoplay]) // Swiper


const MainTop = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // 사용자 연령대, 성별, MBTI 정보
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mbti, setMbti] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  const age_dict = {
    "age_10": "10대가 좋아하는 장소",
    "age_20": "20대가 좋아하는 장소",
    "age_30": "30대가 좋아하는 장소",
    "age_40": "40대가 좋아하는 장소",
    "age_50": "50대가 좋아하는 장소",
    "age_60": "60대가 좋아하는 장소",
    "age_not_login": ""
  };
  const gender_dict = {
    "gender_male": "남성이 좋아하는 장소",
    "gender_female": "여성이 좋아하는 장소",
    "gender_not_login": ""
  };
  const mbti_dict = {
    "mbti_istj": "ISTJ가 좋아하는 장소",
    "mbti_istp": "ISTP가 좋아하는 장소",
    "mbti_isfj": "ISFJ가 좋아하는 장소",
    "mbti_isfp": "ISFP가 좋아하는 장소",
    "mbti_intj": "INTJ가 좋아하는 장소",
    "mbti_intp": "INTP가 좋아하는 장소",
    "mbti_infj": "INFJ가 좋아하는 장소",
    "mbti_infp": "INFP가 좋아하는 장소",
    "mbti_estj": "ESTJ가 좋아하는 장소",
    "mbti_estp": "ESTP가 좋아하는 장소",
    "mbti_esfj": "ESFJ가 좋아하는 장소",
    "mbti_esfp": "ESFP가 좋아하는 장소",
    "mbti_entj": "ENTJ가 좋아하는 장소",
    "mbti_entp": "ENTP가 좋아하는 장소",
    "mbti_enfj": "ENFJ가 좋아하는 장소",
    "mbti_enfp": "ENFP가 좋아하는 장소",
    "mbti_not_login": ""
  };


  const getProfile = () => {
    console.log("[MainTop.js] ==> Loading profile...");
    axios.get(
        "http://localhost:8000/users/profile/", {
            headers: {
                "Authorization": `Token ${token}`
            }
        }
    )
    .then((response) => {
        setAge(response.data.age);
        setGender(response.data.gender);
        setMbti(response.data.mbti);
    })
  }

  useEffect(() => {
    if(sessionStorage.getItem("token")){
        getProfile();
    }else{
        setAge("age_none");
        setGender("gender_none");
        setMbti("mbti_none");
        setLoginMsg("로그인 후 연령대, 성별, MBTI에 따른 추천을 받아보세요.");
    }
  }, []);
  console.log(age,gender,mbti);
  return (
    <Container className="container_style" style={age=="age_none"&&gender=="gender_none"&&mbti=="mbti_none"?{"display":"none","padding-top":"24px"}:{"padding-top":"24px"}}>
    <div>
        <div class="hot-title fw">
            <img className='hot-place-sparkle' src = {require("../img/fire.png")}/>FIT.PLACE PICK
        </div>

    <Swiper
        spaceBetween={10}
        pagination={{ clickable: true }}
        loop={true}
    >
    <div className='container-lg'>
        <div className='h_row_center'>
            {
                age=='age_none'?
                null
                :<SwiperSlide>
                    <div onClick={()=>{navigate('/maintopsearch', {
                        state: {age: age, gender: '', mbti: ''}
                    });}} className='items_top'
                    >
                        <img style={{borderRadius: "12px"}} src={require('../img/top_1.jpg')} alt='first'className="top_img" />
                        <h5 className='main_top_text'>{age_dict[age]}</h5>
                        <div className='h_button'>
                            <h6 className='h_button_detail'>상세보기</h6>
                        </div>
                    </div>
                </SwiperSlide>
            }
            {
                gender=='gender_none'?
                null
                :<SwiperSlide>
                    <div onClick={()=>{navigate('/maintopsearch', {
                        state: {age:'', gender: gender, mbti: ''}
                    });}} className='items_top'
                    >
                        <img style={{borderRadius: "12px"}} src={require('../img/top_2.jpg')} alt='second'className="top_img" />
                        <h5 className='main_top_text'>{gender_dict[gender]}</h5>
                        <div className='h_button'>
                            <h6 className='h_button_detail'>상세보기</h6>
                        </div>
                    </div>
                </SwiperSlide>
            }
            
            {
                mbti=='mbti_none'?
                null
                :<SwiperSlide>
                    <div onClick={()=>{navigate('/maintopsearch', {
                        state: {age: '', gender: '', mbti: mbti}
                    });}} className='items_top'
                    >
                        <img style={{borderRadius: "12px"}} src={require('../img/top_3.jpg')} alt='third' className="top_img"/>
                        <h5 className='main_top_text'>{mbti_dict[mbti]}</h5>
                        <div className='h_button'>
                            <h6 className='h_button_detail'>상세보기</h6>
                        </div>
                    </div>
                </SwiperSlide>
            }
            
            
            {/* <div className='login-msg grey-color'>{loginMsg}</div> */}
        </div>
    </div>
    </Swiper>
    </div>
    </Container>
  )
}

export default MainTop