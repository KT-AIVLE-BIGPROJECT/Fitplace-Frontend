import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Container, Form, ButtonGroup, Button, FloatingLabel} from 'react-bootstrap'

import Layout from '../layouts/Layout';
import './Profile.css';

const Profile = () => {

  var age_dict = {
    "age_10": "10대",
    "age_20": "20대",
    "age_30": "30대",
    "age_40": "40대",
    "age_50": "50대",
    "age_60": "60대",
    "age_none": "선택안함",
  };
  var gender_dict = {
    "gender_male": "남성",
    "gender_female": "여성",
    "gender_none": "선택안함",
  };
  var mbti_dict = {
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
    "mbti_none": "선택안함",
  }

  // [ State ]
  const [nickname, setNickname] = useState("");
  const [userImage, setUserImage] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mbti, setMbti] = useState("");

  const token = localStorage.getItem("token"); // 사용자 토큰

  // [ 함수 ]
  const selectAge = (event) => { // 연령대 선택 시
    setAge(event.target.value);
  }
  const selectGender = (gd) => { // 성별 선택 시
    setGender(gd);
  }
  const selectMbti = (event) => { // MBTI 선택 시
    setMbti(event.target.value);
  }
  const pressLikingCheck = () => { // 취향 키워드 수정 버튼 클릭 시
    window.location.replace('http://localhost:3000/liking');
  };

  const pressSaveModify = (event) => { // 수정한 내용 저장 버튼 클릭 시
    event.preventDefault();
    console.log("[Profile.js] ==> pressSaveModify called...");
    var profileForm = {
      "nickname": nickname,
      "age": age,
      "gender": gender,
      "mbti": mbti,
    }
    axios
      .patch("http://localhost:8000/users/profile/", profileForm, {
        headers: {
          "Authorization": `Token ${token}`
        },
      })
      .then((response) => {
        if(response.status < 300) {
          alert("프로필 정보가 수정되었습니다!");
          window.location.replace('http://localhost:3000');
        }
      })
      .cartch((error) => {
        console.log(error);
        alert("수정 도중 문제가 발생했습니다.");
      })
  };


  // [사용자 프로필 정보 불러오기]
  useEffect(()=>{
    console.log("[Profile.js] ==> Loading profile...");
    axios
      .get("http://localhost:8000/users/profile/", {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
      .then((response)=>{
        console.log(response.data);
        setNickname(response.data.nickname);
        setUserImage(response.data.image);
        setAge(response.data.age);
        setGender(response.data.gender);
        setMbti(response.data.mbti);
      })
      .catch((error) => {
        console.log(error);
        alert("프로필 정보를 불러오는 데 문제가 생겼습니다.");
      })
  },[]);

  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <br/>
        <h3 class="profileTitle">
          <span>프로필 정보</span>
          <button
            class="moveButton"
            type="submit"
            onClick={pressLikingCheck}
          >
              취향 키워드 수정하러 가기
          </button>
        </h3><br/>
        
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingInput" label="닉네임">
            <Form.Control
              type="text"
              placeholder="닉네임을 입력하세요."
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
          </FloatingLabel>
        </Form.Group><br/>
        {/* <img src={userImage}></img> */}
        <Form.Group>
          <Form.Label>연령대</Form.Label>
          <Form.Select aria-label="Default select example" size="md" value={age} onChange={selectAge}>
            {/* <option>연령대를 선택해주세요.</option> */}
            <option value="age_none">선택안함</option>
            <option value="age_10">10대</option>
            <option value="age_20">20대</option>
            <option value="age_30">30대</option>
            <option value="age_40">40대</option>
            <option value="age_50">50대</option>
            <option value="age_60">60대</option>
          </Form.Select>
        </Form.Group><br/>
        <Form.Label>성별</Form.Label>
        <Form.Group>
          <button
            style={gender==="gender_male" ? {background: "rgb(250, 150, 0)"} : {background: "rgb(146, 145, 144)"}}
            class="genderButton"
            onClick={()=>selectGender("gender_male")}
          >
            남성
          </button>
          <button
            style={gender==="gender_female" ? {background: "rgb(250, 150, 0)"} : {background: "rgb(146, 145, 144)"}}
            class="genderButton"
            onClick={()=>selectGender("gender_female")}
          >
            여성
          </button>
          <button
            style={gender==="gender_none" ? {background: "rgb(250, 150, 0)"} : {background: "rgb(146, 145, 144)"}}
            class="genderNoneButton"
            onClick={()=>selectGender("gender_none")}
          >
            선택안함
          </button>
        </Form.Group><br/>
        <Form.Group>
          <Form.Label>MBTI</Form.Label>
          <Form.Select aria-label="Default select example" size="md" value={mbti} onChange={selectMbti}>
            <option value="mbti_none">선택안함</option>
            <option value="mbti_istj">ISTJ</option>
            <option value="mbti_istp">ISTP</option>
            <option value="mbti_isfj">ISFJ</option>
            <option value="mbti_isfp">ISFP</option>
            <option value="mbti_intj">INTJ</option>
            <option value="mbti_intp">INTP</option>
            <option value="mbti_infj">INFJ</option>
            <option value="mbti_infp">INFP</option>
            <option value="mbti_estj">ESTJ</option>
            <option value="mbti_estp">ESTP</option>
            <option value="mbti_esfj">ESFJ</option>
            <option value="mbti_esfp">ESFP</option>
            <option value="mbti_entj">ENTJ</option>
            <option value="mbti_entp">ENTP</option>
            <option value="mbti_enfj">ENFJ</option>
            <option value="mbti_enfp">ENFP</option>
          </Form.Select>
        </Form.Group><br/>

        <div className="d-grid gap-1">
            <button
              class="button"
              type="submit"
              onClick={pressSaveModify}
            >
                수정한 내용 저장하기
            </button>
        </div><br/>
      </Container>
    </Layout>
  )
}

export default Profile