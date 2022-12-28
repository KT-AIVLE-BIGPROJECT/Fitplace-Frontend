import React, {useState, useEffect} from 'react';
import {
    Button,
    Col,
    Form,
    Row,
    Container,
    FloatingLabel,
    ButtonGroup
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Layout from '../layouts/Layout';
import './BeforeSignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    // 회원가입 입력 정보 state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    // 프로필 입력 정보 state
    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("age_none");
    const [gender, setGender] = useState("gender_none");
    const [mbti, setMbti] = useState("mbti_none");

    // 기타 state
    const [toNext, setToNext] = useState(true);

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

    const pressSignUp = (event) => { // 회원가입 버튼 누를 시
        event.preventDefault();
        console.log("[Signup.js] ==> pressSignUp called.");
        var token;
        var profileForm = {
            "nickname": nickname,
            "age": age,
            "gender": gender,
            "mbti": mbti
        }
        // 회원가입 요청 보내기
        axios
            .post("http://localhost:8000/users/register/", {
                "username": username,
                "email": email,
                "password": password,
                "password2": password2
            })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    // 로그인 요청으로 토큰 받아오기
                    axios
                        .post("http://localhost:8000/users/login/", {
                            "username": username,
                            "password": password
                        })
                        .then((response) => {
                            token = response.data["token"]
                            if (token) {
                                // 사용자가 입력한 프로필 정보 갱신
                                axios
                                    .patch("http://localhost:8000/users/profile/", profileForm, {
                                        headers: {
                                            "Authorization": `Token ${token}`
                                        }
                                    })
                                    .then((response) => {
                                        if (response.status < 300) {
                                            window.location.replace('http://localhost:3000/signupFinished');
                                        }
                                    })
                            }
                        })
                } else {
                    alert("입력정보를 다시 확인해주세요."); // 예외처리 더 필요할듯
                }
            })
    }

    useEffect(() => {
        if (username != "" && email != "" && password != "" && password2 != "") {
            setToNext(false);
        } else {
            setToNext(true);
        }
    })
    return (
        <Layout>
            <Container
                className='container_style'
                style={{
                    minHeight: "75vh"
                }}>
                <div className='linemap area'>
                    <div>
                        <a href="/"><img className="homeImg" src ={require("../img/home.png")}/></a>
                    </div>
                    <div className='subtitle'>
                        &gt;
                        <span>회원가입</span>
                    </div>
                </div>
                <br/>
                <h4 className='mt-1'>회원가입</h4>
                <div className='mem_content'>
                    <div className='join_content'>
                        <div class="join_step">
                            <div className="join_step_inner">
                                <div class="join_step_box pointer" onClick={() => {window.location.href='/bfsignup';}}>
                                    <div>
                                        <span>01</span>
                                        <span>약관동의</span>
                                    </div>
                                </div>
                            </div>
                            <span>&#8250;</span>
                            <div className="join_step_inner">
                                <div class="join_step_box on">
                                    <div>
                                        <span>02</span>
                                        <span>정보입력</span>
                                    </div>
                                </div>
                            </div>
                            <span>&#8250;</span>
                            <div className="join_step_inner">
                                <div class="join_step_box">
                                    <div>
                                        <span>03</span>
                                        <span>가입완료</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-50 form-group">
                        <div>
                        <h5 className='mb-5'><span className='fontWeight-400'>필수입력</span><span className="signup_required">*</span></h5>
                            <Form.Group className="mb-5">
                                <div className='flex_row'>
                                    <span className='signup_title'>아이디<span className='ml-10'>*</span></span>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}/>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <div className='flex_row'>
                                    <span className='signup_title'>이메일<span className='ml-10'>*</span></span>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}/>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <div className='flex_row'>
                                    <span className='signup_title'>비밀번호<span className='ml-10'>*</span></span>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}/>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <div className='flex_row'>
                                    <span className='signup_title'>비밀번호 확인<span className='ml-10'>*</span></span>
                                    <Form.Control
                                        type="password"
                                        value={password2}
                                        onChange={(event) => setPassword2(event.target.value)}/>
                                </div>
                            </Form.Group>
                            <hr className='form_split mb-5'/>
                            <h5 className='mb-5'><span className='fontWeight-400'>선택사항</span> <span className='fontSize-1'>( 장소 추천에 필요한 사용자 정보를 입력해주세요 )</span></h5>
                            <Form.Group className="mb-5">
                                <div className='flex_row'>
                                    <span className='signup_title'>닉네임</span>
                                    <Form.Control
                                        type="text"
                                        value={nickname}
                                        onChange={(event) => setNickname(event.target.value)}/>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <div className='flex_row'>
                                    <span className='signup_title'>연령대</span>
                                    <Form.Select
                                    aria-label="Default select example"
                                    size="sm"
                                    defaultValue={age}
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
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <div className='flex_row'>
                                    <span className='signup_title'>성별</span>
                                    <button
                                        className={gender === "gender_male"?'genderBtn select':'genderBtn'}
                                        onClick={() => selectGender("gender_male")}>
                                        남성
                                    </button>
                                    <button
                                        className={gender === "gender_female"?'genderBtn select ml-1':'genderBtn ml-1'}
                                        onClick={() => selectGender("gender_female")}>
                                        여성
                                    </button>
                                    <button
                                        className={gender === "gender_none"?'genderBtn select ml-1':'genderBtn ml-1'}
                                        onClick={() => selectGender("gender_none")}>
                                        선택안함
                                    </button>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div className='flex_row'>
                                    <span className='signup_title'>MBTI</span>
                                    <Form.Select
                                        aria-label="Default select example"
                                        size="sm"
                                        defaultValue={mbti}
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
                                </div>
                            </Form.Group>
                        </div>
                    </div>
                    
                    

                    <div class="align-center">
                        <button
                            class="backButton btn_lg mr-13"
                            type="button"
                            onClick={() => {
                              window.location.href='/bfsignup';
                            }}>
                            뒤로
                        </button>
                        <button
                            style={toNext
                                ? {
                                    background: "rgb(146, 145, 144)"
                                }
                                : {
                                    background: "rgb(250, 150, 0)"
                                }}
                            class="nextButton btn_lg ml-13"
                            type="button"
                            disabled={toNext}
                            onClick={pressSignUp}>
          
                            완료
                        </button>
                    </div>
                </div>

            </Container>
        </Layout>
    )
}

export default SignUp