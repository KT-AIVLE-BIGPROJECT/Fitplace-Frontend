import React from 'react'
import "../css/main.css"


const MainTop = () => {
  return (
    <div className='container-lg'>
        <div className='h_row_center ml-55'>
            <div className='items'>
                <img src='//img.hourplace.co.kr/image/user/7698/2022/11/09/0981c627-53ea-4b9b-bc1e-1210dae87e6c.jpeg?s=550x364&t=cover&q=80' alt='first' />
                <h5 className='main_top_text'>10대가 좋아하는 장소</h5>
                <div className='h_button'>
                    <h6 className='h_button_detail'>상세보기</h6>
                </div>
            </div>
            <div className='items'>
                <img src='//img.hourplace.co.kr/place/user/57238/2022/08/14/2799d66a-a153-4b61-a781-1f073c1f6337?s=550x364&t=cover&q=80' alt='second' />
                <h5 className='main_top_text'>20대가 좋아하는 장소</h5>
                <div className='h_button'>
                    <h6 className='h_button_detail'>상세보기</h6>
                </div>
            </div>
            <div className='items'>
                <img src='//img.hourplace.co.kr/image/user/13313/2022/03/25/7fa518a4-5782-4a11-a4fb-123e10ae06b8.jpeg?s=550x364&t=cover&q=80' alt='third' />
                <h5 className='main_top_text'>30대가 좋아하는 장소</h5>
                <div className='h_button'>
                    <h6 className='h_button_detail'>상세보기</h6>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default MainTop