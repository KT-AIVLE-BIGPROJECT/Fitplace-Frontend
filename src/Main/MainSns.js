import React from 'react'
import '../css/main.css'

const MainSns = () => {
  return (
    <div>
        <div className='h_row_center'>
            <h4># SNS 둘러보기</h4>
        </div>

        <div className='margin_box'>
            <div className='h_row'>
                
                <div className='single_box'>
                    <img className='snsimg' src="https://blog.kakaocdn.net/dn/CHb0U/btqxrW04Y5b/mzimBHhLuGMBYvCS33uyh0/img.jpg" alt="insta_logo" />
                </div>
                
                
                <div className='single_box'>
                    <img className='snsimg' src="https://blog.kakaocdn.net/dn/AcIGI/btqxtp2xkg2/EGABG3i2NAMq3kRu1VaGzk/img.jpg" alt="twitter_logo" />
                </div> 
                            
            </div>
        </div>
    </div>

    
  )
}

export default MainSns