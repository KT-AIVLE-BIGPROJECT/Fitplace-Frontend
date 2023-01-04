import React, { useEffect, useState } from 'react'
import "../css/main.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const MainTop = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // 사용자 연령대, 성별, MBTI 정보
  const [age, setAge] = useState("age_none");
  const [gender, setGender] = useState("gender_none");
  const [mbti, setMbti] = useState("mbti_none");
  const [loginMsg, setLoginMsg] = useState("");

  const age_dict = {
    "age_10": "10대가 좋아하는 장소",
    "age_20": "20대가 좋아하는 장소",
    "age_30": "30대가 좋아하는 장소",
    "age_40": "40대가 좋아하는 장소",
    "age_50": "50대가 좋아하는 장소",
    "age_60": "60대가 좋아하는 장소",
    "age_none": "연령대를 설정하고 추천을 받아보세요.",
    "age_not_login": ""
  };
  const gender_dict = {
    "gender_male": "남성이 좋아하는 장소",
    "gender_female": "여성이 좋아하는 장소",
    "gender_none": "성별을 설정하고 추천을 받아보세요.",
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
    "mbti_none": "MBTI를 설정하고 추천을 받아보세요.",
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
        // var random_age_list = ['age_10', 'age_20', 'age_30', 'age_40', 'age_50', 'age_60']
        // var random_age = random_age_list[Math.floor(Math.random() * random_age_list.length)];
        // var random_gender_list = ['gender_male', 'gender_female']
        // var random_gender = random_gender_list[Math.floor(Math.random() * random_gender_list.length)];
        // var random_mbti_list = ["mbti_istj", "mbti_istp", "mbti_isfj", "mbti_isfp",
        //                         "mbti_intj", "mbti_intp", "mbti_infj", "mbti_infp",
        //                         "mbti_estj", "mbti_estp", "mbti_esfj", "mbti_esfp",
        //                         "mbti_entj", "mbti_entp", "mbti_enfj", "mbti_enfp"]
        // var random_mbti = random_mbti_list[Math.floor(Math.random() * random_mbti_list.length)];
        // setAge(random_age);
        // setGender(random_gender);
        // setMbti(random_mbti);
        setAge("age_not_login");
        setGender("gender_not_login");
        setMbti("mbti_not_login");
        setLoginMsg("로그인 후 연령대, 성별, MBTI에 따른 추천을 받아보세요.");
    }
  }, []);

  return (
    <div className='container-lg'>
        <div className='h_row_center ml-55'>
            <div onClick={()=>{navigate('/maintopsearch', {
                state: {age: age, gender: '', mbti: ''}
            });}} className='items'
            >
                <img style={{borderRadius: "12px"}} src='//img.hourplace.co.kr/image/user/7698/2022/11/09/0981c627-53ea-4b9b-bc1e-1210dae87e6c.jpeg?s=550x364&t=cover&q=80' alt='first' />
                <h5 className='main_top_text'>{age_dict[age]}</h5>
                <div className='h_button'>
                    <h6 className='h_button_detail'>상세보기</h6>
                </div>
            </div>
            <div onClick={()=>{navigate('/maintopsearch', {
                state: {age:'', gender: gender, mbti: ''}
            });}} className='items'
            >
                <img style={{borderRadius: "12px"}} src='//img.hourplace.co.kr/place/user/57238/2022/08/14/2799d66a-a153-4b61-a781-1f073c1f6337?s=550x364&t=cover&q=80' alt='second' />
                <h5 className='main_top_text'>{gender_dict[gender]}</h5>
                <div className='h_button'>
                    <h6 className='h_button_detail'>상세보기</h6>
                </div>
            </div>
            <div onClick={()=>{navigate('/maintopsearch', {
                state: {age: '', gender: '', mbti: mbti}
            });}} className='items'
            >
                <img style={{borderRadius: "12px"}} src='//img.hourplace.co.kr/image/user/13313/2022/03/25/7fa518a4-5782-4a11-a4fb-123e10ae06b8.jpeg?s=550x364&t=cover&q=80' alt='third' />
                <h5 className='main_top_text'>{mbti_dict[mbti]}</h5>
                <div className='h_button'>
                    <h6 className='h_button_detail'>상세보기</h6>
                </div>
            </div>
            <div className='login-msg grey-color'>{loginMsg}</div>
        </div>
    </div>
    
  )
}

export default MainTop