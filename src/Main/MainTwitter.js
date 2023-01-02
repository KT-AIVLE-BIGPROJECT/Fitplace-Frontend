import React from 'react'
import '../css/main.css'
// import { TwitterApi } from 'twitter-api-v2';

// const NODE_ENV="development"
// const API_KEY="9oEsNgjkesXw02zzQ7R6E9kNI"
// const API_SECRET="SwUP2KGLcTwIMWDBLNwfedppTex2gqnARl873Aar9g4HbRrwgQ"
// const ACCESS_TOKEN="1141972033959415814-2ZW0pzrO9S8Uh2xBUgAR5EshY2DJFi"
// const ACCESS_SECRET="Pfs4vo61rnYgOYjBjRAc3QpQtoOtdJvEK94BZRceu8ucb"
// const BEARER_TOKEN="AAAAAAAAAAAAAAAAAAAAAC%2BxkwEAAAAADaH5IYJTuYFxVjwr4K1GmvXo3u8%3DxjW6xoTabwQM9PbBnRcY7OH3N549JHiBBNmvGmf4DtVkihqGaF"

// const APP_ID="1141972033959415814"

// const client = new TwitterApi({
//     appKey: process.env.API_KEY,
//     appSecret: process.env.API_SECRET,
//     accessToken: process.env.ACCESS_TOKEN,
//     accessSecret: process.env.ACCESS_SECRET,
//     });
//     console.log(client)
//     const bearer = new TwitterApi(process.env.BEARER_TOKEN);

//     const twitterClient = client.readWrite;
//     const twitterBearer = bearer.readOnly;
//     console.log(twitterBearer,twitterClient);

//     module.exports = { twitterClient, twitterBearer };

const MainTwitter = () => {
    

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