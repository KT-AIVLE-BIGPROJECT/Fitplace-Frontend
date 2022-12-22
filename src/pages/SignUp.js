import React from 'react'


const SignUp = () => {
  return (
    <>
      <div className='h_column_center'>
        <h3>회원가입</h3>
      </div>
      <div className='h_column_center'>
        <div className='h_column_center signup_box'>
          <div className='signup_info'>
            <div className='input_container'>
              <label class="form-label mt-4" for="readOnlyInput">아이디</label>
              <input class="form-control" id="readOnlyInput" type="text" placeholder="아이디를 입력하세요" readonly=""></input>
            </div>
            
            <div className='input_container'>
              <label class="form-label mt-4" for="readOnlyInput">비밀번호</label>
              <input class="form-control" id="readOnlyInput" type="password" placeholder="비밀번호를 입력하세요" readonly=""></input>
            </div>

            <div className='input_container'>
              <label class="form-label mt-4" for="readOnlyInput">비밀번호 확인</label>
              <input class="form-control" id="readOnlyInput" type="password" placeholder="비밀번호를 입력하세요" readonly=""></input>
            </div>

            <div className='input_container'>
              <label class="form-label mt-4" for="readOnlyInput">닉네임</label>
              <input class="form-control" id="readOnlyInput" type="text" placeholder="닉네임을 입력하세요" readonly=""></input>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp