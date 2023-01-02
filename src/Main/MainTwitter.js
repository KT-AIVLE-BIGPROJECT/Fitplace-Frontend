import React, { useEffect } from 'react'
import '../css/main.css'
// import { TwitterApi } from 'twitter-api-v2';
//import { TwitterApiAutoTokenRefresher } from '@twitter-api-v2/plugin-token-refresher';
import axios from 'axios';

const NODE_ENV="development"
const API_KEY="9oEsNgjkesXw02zzQ7R6E9kNI"
const API_SECRET="SwUP2KGLcTwIMWDBLNwfedppTex2gqnARl873Aar9g4HbRrwgQ"
const ACCESS_TOKEN="1141972033959415814-2ZW0pzrO9S8Uh2xBUgAR5EshY2DJFi"
const ACCESS_SECRET="Pfs4vo61rnYgOYjBjRAc3QpQtoOtdJvEK94BZRceu8ucb"
const BEARER_TOKEN="AAAAAAAAAAAAAAAAAAAAAC%2BxkwEAAAAADaH5IYJTuYFxVjwr4K1GmvXo3u8%3DxjW6xoTabwQM9PbBnRcY7OH3N549JHiBBNmvGmf4DtVkihqGaF"

const APP_ID="1141972033959415814"
  
const MainTwitter = () => {

    useEffect(()=>{
        var query = '강남%23승연아_우즈야_여기야 OR %23신동_넌이미먹었겠지 \
        OR %23박지성_단1g도안줌 OR %23제노의_맛그당어 OR %23런쥔이_밥무거쒀 \
        OR %23확신해찬맛집 OR %23몬베베가_몬베베에게_추천하는_맛집 \
        OR %23백현이를_위한_맛집투어 OR %23황제님을위한메뉴판 OR %23강다니엘_염염긋 \
        OR %23완전_장원영_스타일_아니냐구 OR %23ㄷㅂㅇㅈ OR %23런쥔이의_맛집내비게이션 \
        OR %23승철이_이거먹고_볼빵빵했꾸마 OR %23정한아_마니머거여ㅎㅎ OR %23조슈아_먹어보슈아 \
        OR %23순영아_이거_맛있어 OR %23원우야_여기_테이스티 OR %23민규라고치고_디너쇼해도돼 \
        OR %23도겸이도_도아할_맛집 OR %23믿고먹어boo세요';
        var body = {
            "query": query
        }
        axios.post(`http://localhost:8000/twitter/`, body)
        .then((response)=>{
            console.log(response.data);
        })
    },[])

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

export default MainTwitter