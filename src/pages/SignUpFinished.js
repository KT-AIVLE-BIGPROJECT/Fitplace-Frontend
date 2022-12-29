import {Container} from 'react-bootstrap';


import Layout from '../layouts/Layout';
import './BeforeSignUp.css';

const SignUpFinished = () => {

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
                                <div class="join_step_box" onClick={() => {window.location.href='/bfsignup';}}>
                                    <div>
                                        <span>01</span>
                                        <span>약관동의</span>
                                    </div>
                                </div>
                            </div>
                            <span>&#8250;</span>
                            <div className="join_step_inner">
                                <div class="join_step_box">
                                    <div>
                                        <span>02</span>
                                        <span>정보입력</span>
                                    </div>
                                </div>
                            </div>
                            <span>&#8250;</span>
                            <div className="join_step_inner">
                                <div class="join_step_box on">
                                    <div>
                                        <span>03</span>
                                        <span>가입완료</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-50 form-group text-center'>
                        <img src={require('../img/check.png')} className='checkImg mb-50'/>
                        <h4 className='mb-50'>회원가입을 축하합니다.</h4>
                        <button
                            class="backButton btn_lg mr-13 checkBtn"
                            type="button"
                            onClick={() => {
                            window.location.href='/';
                            }}>
                            FIT.PLACE 이용하기
                        </button>
                    </div>
                    
                </div>
            </Container>
        </Layout>
    )
}

export default SignUpFinished