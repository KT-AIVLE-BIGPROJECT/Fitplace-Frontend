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
  const age_dict = {
    "age_10": "10대",
    "age_20": "20대",
    "age_30": "30대",
    "age_40": "40대",
    "age_50": "50대",
    "age_60": "60대",
    "age_none": "선택안함"
  };
  const gender_dict = {
    "gender_male": "남성",
    "gender_female": "여성",
    "gender_none": "선택안함"
  };
  const mbti_dict = {
    "mbti_istj": "ISTJ",
    "mbti_istp": "ISTP",
    "mbti_isfj": "ISFJ",
    "mbti_isfp": "ISFP",
    "mbti_intj": "INTJ",
    "mbti_intp": "INTP",
    "mbti_infj": "INFJ",
    "mbti_infp": "INFP",
    "mbti_estj": "ESTJ",
    "mbti_estp": "ESTP",
    "mbti_esfj": "ESFJ",
    "mbti_esfp": "ESFP",
    "mbti_entj": "ENTJ",
    "mbti_entp": "ENTP",
    "mbti_enfj": "ENFJ",
    "mbti_enfp": "ENFP",
    "mbti_none": "선택안함"
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
    getProfile();
  }, []);

  return (
    <div className='container-lg'>
        <div className='h_row_center ml-55'>
            <div className='items'>
                <img src='//img.hourplace.co.kr/image/user/7698/2022/11/09/0981c627-53ea-4b9b-bc1e-1210dae87e6c.jpeg?s=550x364&t=cover&q=80' alt='first' />
                <h5 className='main_top_text'>{age_dict[age]}가 좋아하는 장소</h5>
                <div className='h_button'>
                    <h6 onClick={()=>{navigate('/maintopsearch', {
                        state: {age: age, gender: '', mbti: ''}
                    });}} className='h_button_detail'>상세보기</h6>
                </div>
            </div>
            <div className='items'>
                <img src='//img.hourplace.co.kr/place/user/57238/2022/08/14/2799d66a-a153-4b61-a781-1f073c1f6337?s=550x364&t=cover&q=80' alt='second' />
                <h5 className='main_top_text'>{gender_dict[gender]}이 좋아하는 장소</h5>
                <div className='h_button'>
                    <h6 onClick={()=>{navigate('/maintopsearch', {
                        state: {age:'', gender: gender, mbti: ''}
                    });}} className='h_button_detail'>상세보기</h6>
                </div>
            </div>
            <div className='items'>
                <img src='//img.hourplace.co.kr/image/user/13313/2022/03/25/7fa518a4-5782-4a11-a4fb-123e10ae06b8.jpeg?s=550x364&t=cover&q=80' alt='third' />
                <h5 className='main_top_text'>{mbti_dict[mbti]}가 좋아하는 장소</h5>
                <div className='h_button'>
                    <h6 onClick={()=>{navigate('/maintopsearch', {
                        state: {age: '', gender: '', mbti: mbti}
                    });}} className='h_button_detail'>상세보기</h6>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default MainTop