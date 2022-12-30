import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Container, Form, ButtonGroup, Button, FloatingLabel} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import Layout from '../layouts/Layout';
import './Profile.css';

const Profile = () => {

    let age_dict = {
        "age_10": "10대",
        "age_20": "20대",
        "age_30": "30대",
        "age_40": "40대",
        "age_50": "50대",
        "age_60": "60대",
        "age_none": "선택안함"
    };
    let gender_dict = {
        "gender_male": "남성",
        "gender_female": "여성",
        "gender_none": "선택안함"
    };
    let mbti_dict = {
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
    }

    // [ State ]
    const navigate = useNavigate();
    const [toNext, setToNext] = useState(true);
    const [nickname, setNickname] = useState("");
    const [userImage, setUserImage] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [mbti, setMbti] = useState("");

    //const token = localStorage.getItem("token");  사용자 토큰
    const token = sessionStorage.getItem("token"); // 사용자 토큰

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
        window
            .location
            .replace('http://localhost:3000/liking');
    };

    const pressSaveModify = (event) => { // 수정한 내용 저장 버튼 클릭 시
        event.preventDefault();
        console.log("[Profile.js] ==> pressSaveModify called...");
        let profileForm = {
            "nickname": nickname,
            "age": age,
            "gender": gender,
            "mbti": mbti
        }
        axios
            .patch("http://localhost:8000/users/profile/", profileForm, {
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
            .then((response) => {
                if (response.status < 300) {
                    alert("프로필 정보가 수정되었습니다!");
                    window
                        .location
                        .replace('http://localhost:3000/profile');
                }
            })
            .cartch((error) => {
                console.log(error);
                alert("수정 도중 문제가 발생했습니다.");
            })
    };
    useEffect(() => {
        if (nickname != "" ) {
            setToNext(false);
        } else {
            setToNext(true);
        }
    })

    // [사용자 프로필 정보 불러오기]
    useEffect(() => {
        console.log("[Profile.js] ==> Loading profile...");
        axios
            .get("http://localhost:8000/users/profile/", {
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
            .then((response) => {
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
        }, []);

    return (
        <Layout>
            <Container
                className='container_style'
                style={{
                    minHeight: "75vh"
                }}>
                <div className='linemap area'>
                    <div>
                        <a href="/"><img className="homeImg" src={require("../img/home.png")}/></a>
                    </div>
                    <div className='subtitle'>
                        &gt;
                        <span>프로필</span>
                    </div>
                </div>
                <br/>
                <h4 className='mb-5'>프로필<img src={require('../img/user.png')} className='profileImg ml-1'/></h4>
                <div className='flex-row'>
                    <div className='width-40'>
                        <h3 class="profileTitle">
                            <h4
                                className="pointer mb-3 select"
                                onClick={() => {
                                    window.location.href = '/profile';
                                }}>회원정보 수정</h4>
                            <h4 type="submit" onClick={() => {
                                    navigate('/liking');
                                }} className="pointer mb-3 unselect">
                                취향 키워드 수정
                            </h4>
                        </h3><br/>
                    </div>
                    <div className='width-60'>
                        <div className='form-group'>
                            <div>
                                {/* <Form.Group>
                                <img class="profileImg" src={userImage}></img><br/>
                                <input type="file" id="chooseFile" name="chooseFile" accept="image/*" onchange="loadFile(this)" />
                                </Form.Group><br/> */
                                }
                                <Form.Group className='mb-5'>
                                    <div className='mb-3 fontWeight-400'>닉네임<span className="signup_required">*</span></div>
                                    <Form.Control
                                        type="text"
                                        value={nickname}
                                        onChange={(event) => setNickname(event.target.value)}
                                        className='width-100 input-form-padding'/>
                                </Form.Group>
                                <Form.Group className='mb-5'>
                                    <div className='mb-3 fontWeight-400'>연령대</div>
                                    <Form.Select
                                        className='width-100 input-form-padding'
                                        aria-label="Default select example"
                                        size="sm"
                                        value={age}
                                        onChange={selectAge}>
                                        {/* <option>연령대를 선택해주세요.</option> */}
                                        <option value="age_none">선택안함</option>
                                        <option value="age_10">10대</option>
                                        <option value="age_20">20대</option>
                                        <option value="age_30">30대</option>
                                        <option value="age_40">40대</option>
                                        <option value="age_50">50대</option>
                                        <option value="age_60">60대</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group  className='mb-5'>
                                    <div className='mb-3 fontWeight-400'>성별</div>
                                    <button
                                        className={gender === "gender_male"?'genderBtn select width-30':'genderBtn width-30'}
                                        onClick={() => selectGender("gender_male")}>
                                        남성
                                    </button>
                                    <button
                                        className={gender === "gender_female"?'genderBtn select ml-p5 width-30':'genderBtn ml-p5 width-30'}
                                        onClick={() => selectGender("gender_female")}>
                                        여성
                                    </button>
                                    <button
                                        className={gender === "gender_none"?'genderBtn select ml-p5 width-30':'genderBtn ml-p5 width-30'}
                                        onClick={() => selectGender("gender_none")}>
                                        선택안함
                                    </button>
                                </Form.Group>
                                <Form.Group>
                                    <div className='mb-3 fontWeight-400'>MBTI</div>
                                    <Form.Select
                                        className='width-100 input-form-padding'
                                        aria-label="Default select example"
                                        size="sm"
                                        value={mbti}
                                        onChange={selectMbti}>
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
                                </Form.Group>

                            </div>
                            
                        </div>
                        <div className='mb-130'>
                            <div className="d-grid gap-1 align-center mb-130 width-35 m-0a">
                                <button 
                                style={toNext
                                    ? {
                                        background: "rgb(146, 145, 144)"
                                    }
                                    : {
                                        background: "rgb(250, 150, 0)"
                                    }}
                                class="nextButton btn_lg width-100" type="submit" onClick={pressSaveModify
                                }>
                                    수정완료
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </Layout>
    )
}

export default Profile