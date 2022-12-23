import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Container, Form, ButtonGroup, Button} from 'react-bootstrap'

import Layout from '../layouts/Layout'

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

  const [nickname, setNickname] = useState("");
  const [userImage, setUserImage] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mbti, setMbti] = useState("");

  const selectAge = (event) => { // 연령대 선택 시
    setAge(event.target.value);
  }
  const selectMbti = (event) => { // MBTI 선택 시
    setMbti(event.target.value);
  }

  const pressProfileModify = () => { // 프로필 수정 버튼 클릭 시
    window.location.replace('http://localhost:3000/prmodify');
  };

  const token = localStorage.getItem("token"); // 사용자 토큰

  useEffect(()=>{
    console.log("getting profile...");
    axios // 프로필 불러오기
      .get("http://localhost:8000/users/profile/", {
        headers: {
          Authorization: `Token ${token}`
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
        <div>
          <h5>프로필 정보</h5>
        </div>
        
        <div>닉네임 : {nickname}</div>
        {/* <img src={userImage}></img> */}
        <div>연령대 : {age_dict[age]}</div>
        <Form.Select aria-label="Default select example" size="sm" defaultValue={age} onChange={selectAge}>
          <option>연령대를 선택해주세요.</option>
          <option value="age_10">10대</option>
          <option value="age_20">20대</option>
          <option value="age_30">30대</option>
          <option value="age_40">40대</option>
          <option value="age_50">50대</option>
          <option value="age_60">60대</option>
          <option value="age_none">선택안함</option>
        </Form.Select>
        <div>성별 : {gender}</div>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={()=>setGender("male")}>남성</Button>
          <Button variant="secondary" onClick={()=>setGender("female")}>여성</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary" onClick={()=>setGender("none")}>선택안함</Button>
        </ButtonGroup>
        <div>MBTI : {mbti}</div>

        <Button variant="primary" type="button" onClick={pressProfileModify}>
          프로필 수정
        </Button>
      </Container>
    </Layout>
  )
}

export default Profile



// const [rKorea, setRKorea] = useState("");
// const [rWest, setRWest] = useState("");
// const [rChina, setRChina] = useState("");
// const [rJapan, setRJapan] = useState("");
// const [rFast, setRFast] = useState("");
// const [rBunsik, setRBunsik] = useState("");
// const [cCafe, setCCafe] = useState("");
// const [cDessert, setCDessert] = useState("");
// const [cBakery, setCBakery] = useState("");
// const [lGallery, setLGallery] = useState("");
// const [lCraft, setLCraft] = useState("");
// const [lPopup, setLPopup] = useState("");
// const [lTheater, setLTheater] = useState("");
// const [lBook, setLBook] = useState("");
// const [lDepartment, setLDepartment] = useState("");
// const [wPark, setWPark] = useState("");
// const [wMarket, setWMarket] = useState("");
// const [wStreet, setWStreet] = useState("");


// setRKorea(response.data.restaurant_korea);
// setRWest(response.data.restaurant_west);
// setRChina(response.data.restaurant_china);
// setRJapan(response.data.restaurant_japan);
// setRFast(response.data.restaurant_fast);
// setRBunsik(response.data.restaurant_bunsik);
// setCCafe(response.data.cafe_cafe);
// setCDessert(response.data.cafe_dessert);
// setCBakery(response.data.cafe_bakery);
// setLGallery(response.data.leisure_gallery);
// setLCraft(response.data.leisure_craft);
// setLPopup(response.data.leisure_popup);
// setLTheater(response.data.leisure_theater);
// setLBook(response.data.leisure_book);
// setLDepartment(response.data.leisure_department);
// setWPark(response.data.walking_park);
// setWMarket(response.data.walking_market);
// setWStreet(response.data.walking_street);