import React from 'react'
import '../css/main.css'

const MainHot = () => {
  return (
    <div>
        <div className='h_row_center'>
            <h4># 요즘 핫한 장소</h4>
        </div>
        <div className='margin_box'>
            <div className='h_row'>
                
                <div className='single_box'>
                    <img className='hotimg' src="https://mp-seoul-image-production-s3.mangoplate.com/355180/897636_1605688631062_34895?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80" alt="profile" />
                    <div className='namebox'>
                        <h6>티크닉</h6>
                        <h6 className='area_cat'>연남동 - 카페 / 디저트</h6>
                        <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                        <h6 className='star_rank'>4.5</h6>
                    </div>
                </div>
              
                
                <div className='single_box'>
                    <img className='hotimg' src="https://mp-seoul-image-production-s3.mangoplate.com/1059167_1638856879730264.jpg?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80" alt="profile" />
                    <div className='namebox'>
                        <h6>카와카츠</h6>
                        <h6 className='area_cat'>홍대 - 음식점 / 일식</h6>
                        <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                        <h6 className='star_rank'>4.7</h6>
                    </div>
                </div>
            
                <div className='single_box'>
                    <img className='hotimg' src="https://mp-seoul-image-production-s3.mangoplate.com/333417_1636591055766161.jpg?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80" alt="profile" />
                    <div className='namebox'>
                        <h6>야상해</h6>
                        <h6 className='area_cat'>한남동 - 음식점 / 중식</h6>
                        <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                        <h6 className='star_rank'>4.5</h6>
                    </div>
                </div>
                <div className='single_box'>
                    <img className='hotimg' src="https://mp-seoul-image-production-s3.mangoplate.com/350788/1151727_1636461516700_33331?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80" alt="profile" />
                    <div className='namebox'>
                        <h6>몽크스부처</h6>
                        <h6 className='area_cat'>한남동 - 음식점 / 양식</h6>
                        <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                        <h6 className='star_rank'>4.85</h6>
                    </div>
                </div>
            </div>
        </div>

        <div className='h_column_center'>
            <div className='h_center'>
                <div class="d-grid gap-2">
                    <button className='btn btn-lg btn-outline-warning btn_view' type="button">→ View More</button>
                </div>
            </div>
        </div>

    </div>

    

  )
}

export default MainHot