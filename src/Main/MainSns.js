import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from "swiper/react" // basic
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import axios from 'axios';

import '../css/main.css';
// import MainTwitter from './MainTwitter';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

SwiperCore.use([Navigation, Pagination, Autoplay]) // Swiper
  
const MainSns = () => {
    const [randomRegion, setRandomRegion] = useState("");
    const [tweets, setTweets] = useState([]);
    const [tweetUserInfo, setTweetUserInfo] = useState([]);
    const [tweetmediaInfo, setTweetMediaInfo] = useState([]);
    const [temp1, setTemp1] = useState([]);
    const [temp2, setTemp2] = useState([]);
    const [tweetUserInfoList, setTweetUserInfoList] = useState([]);
    const [tweetmediaInfoList, setTweetMediaInfoList] = useState([]);

    // ----------------------------------- [ 컴포넌트 ] -----------------------------------
    const RecentTweets = () => {
        const [AlphaNum, setAlphaNum] = useState("");
        const IsAlphaNume=(e)=>{
            const curValue=e.currentTarget.value;
            const notNum=/[^a-z0-9]/gi;
            setAlphaNum(curValue.replace(notNum,''))
        };
        try{
            var loopIdx = []
            for(var i=0; i<tweets.length; i++){
                loopIdx.push(i);
            }
            return (
                <Swiper spaceBetween={10} loop={true} 
                    breakpoints={{
                        720: { slidesPerView: 1.5, spaceBetween: 10 },
                        1024: { slidesPerView: 2.5, spaceBetween: 20 },
                        1400: { slidesPerView: 3.5, spaceBetween: 30 }
                    }}
                    pagination={{ clickable: true }}
                >
                    {loopIdx.map((i, idx) => {
                        var profile_img;
                        var default_img;
                        if(tweetUserInfoList[i].profile != ""){
                            profile_img = tweetUserInfoList[i].profile;
                        } else{
                            profile_img = require("../img/tweet_default.png");
                        }
                        if(tweetmediaInfoList[i].url != ""){
                            default_img = tweetmediaInfoList[i].url;
                        } else{
                            // default_img = require("../img/no_image.jpg");
                            default_img = "https://blog.kakaocdn.net/dn/AcIGI/btqxtp2xkg2/EGABG3i2NAMq3kRu1VaGzk/img.jpg";
                        }
                        return (
                            <SwiperSlide key={idx}>
                                <div className="swiper-box-sns">
                                    <div className="profile-bar h-row-center margin-top grey-color">
                                        {/* 프로필 */}
                                        <img class="profile-img" style={{objectFit: "cover", borderRadius: "50px"}} src={profile_img}></img>
                                        <div>
                                            <div className='tw-user1'>{tweetUserInfoList[i].name}</div>
                                            <div className='tw-user2'>@{tweetUserInfoList[i].username}</div>
                                        </div>
                                    </div>
                                    <div className='body-area'>
                                        {/* 본문 */}
                                        <div className='grey-color tw-text-area'>{tweets[i].text.substr(0,90)+"..."}</div>
                                        <div className={default_img===tweetmediaInfoList[i].url ? 'body-img1  tw-img-area' : 'bird-img1  tw-img-area'}>
                                            <img className={default_img===tweetmediaInfoList[i].url ? 'body-img2' : 'bird-img2'} src={default_img}></img>
                                        </div>
                                    </div>
                                    {/* 댓글, 좋아요 등 */}
                                    <div className="retweet-area">
                                        <div className="retweet-area-txt grey-color">
                                            {/* 리트윗 */}
                                            <img className="retweet-img" src={require("../img/twitter_retweet.png")} />
                                            {tweets[i].public_metrics.retweet_count}
                                        </div>
                                        <div className='retweet-area-txt grey-color'>
                                            <div>
                                                {/* 좋아요 */}
                                                <img src={require("../img/twitter_heart.png")} className="tw-like-img"/>
                                                {tweets[i].public_metrics.like_count}
                                            </div>
                                            <div style={{marginLeft: "15px"}}>
                                                {/* 댓글 */}
                                                <img src={require("../img/twitter_comment.png")} className="tw-like-img"/>
                                                {tweets[i].public_metrics.reply_count}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )
        }catch{
            return (
                <div>트위터 글 불러오는 중...</div>
            )
        }
    };

    // ----------------------------------- [ 함수 ] -----------------------------------
    // 트위터 최신 글 불러오기
    const loadTweet = () => {
        console.log("[MainSns.js] 최신 트위터 글 불러오는 중 ...");

        var region = ['강남', '구로', '마포', '용산', '종로']
        var random_region = region[Math.floor(Math.random() * region.length)];
        setRandomRegion(random_region);
        let query = random_region + '%23승연아_우즈야_여기야 OR %23신동_넌이미먹었겠지 OR %23박지성_단1g도안줌 OR %23제노의_맛그당어 OR %23런쥔이_밥무거쒀 OR %23확신해찬맛집 OR %23몬베베가_몬베베에게_추천하는_맛집 OR %23백현이를_위한_맛집투어 OR %23황제님을위한메뉴판 OR %23강다니엘_염염긋 OR %23완전_장원영_스타일_아니냐구 OR %23ㄷㅂㅇㅈ OR %23런쥔이의_맛집내비게이션 OR %23승철이_이거먹고_볼빵빵했꾸마 OR %23정한아_마니머거여ㅎㅎ OR %23조슈아_먹어보슈아 OR %23순영아_이거_맛있어 OR %23원우야_여기_테이스티 OR %23민규라고치고_디너쇼해도돼 OR %23도겸이도_도아할_맛집 OR %23믿고먹어boo세요';
        var body = {
            "query": query
        };
        try{
            axios.post(`http://localhost:8000/twitter/`, body)
            .then((response)=>{
                console.log(body);
                // console.log(response.data.data);
                // console.log(response.data.includes.users);
                // console.log(response.data.includes.media);
                setTweets(response.data.data);
                setTweetUserInfo(response.data.includes.users);
                setTweetMediaInfo(response.data.includes.media);
            })
        }catch(error){
            console.log(error);
        }
    };
    // 트위터 글에 따라 사용자, 미디어 정보 갖고오기
    const setTweetInfo = () => {
        if(tweets != []){
            var user_info_list = [];
            var media_info_list = [];
            for(var i=0; i<tweets.length; i++){
                user_info_list.push({
                    "id": "",
                    "name": "",
                    "username": "",
                    "profile": "",
                    "url": "",
                });
                media_info_list.push({
                    "media_key": "",
                    "url": ""
                });
            };
            // 사용자 정보 맵핑
            if(tweetUserInfo != []){
                // API로 받아온 트윗 정보를 확인
                for(var i=0; i<tweets.length; i++){
                    var user_id = tweets[i].author_id;
                    // API로 받아온 user 정보를 확인
                    for (var j=0; j<tweetUserInfo.length; j++){
                        // 매칭되는 유저ID를 배열 인덱스에 맞게 넣어줌 => 있는 것도 있고 없는 것도 있어서 try catch 처리
                        if(user_id === tweetUserInfo[j].id){
                            try{
                                user_info_list[i].id = tweetUserInfo[j].id;
                            }catch{
                                user_info_list[i].id = "";
                            }
                            try{
                                user_info_list[i].name = tweetUserInfo[j].name;
                            }catch{
                                user_info_list[i].name = "";
                            }
                            try{
                                user_info_list[i].username = tweetUserInfo[j].username;
                            }catch{
                                user_info_list[i].username = "";
                            }
                            try{
                                user_info_list[i].profile_image_url = tweetUserInfo[j].profile_image_url;
                            }catch{
                                user_info_list[i].profile_image_url = "";
                            }
                            try{
                                user_info_list[i].url = tweetUserInfo[j].url;
                            }catch{
                                user_info_list[i].url = "";
                            }
                        }
                    }
                }
            };
            // 사진 정보 맵핑
            if(tweetmediaInfo != []){
                // API로 받아온 트윗 정보를 확인
                for(var i=0; i<tweets.length; i++){
                    if(tweets[i].attachments){
                        var media_key = tweets[i].attachments.media_keys[0];
                        // API로 받아온 user 정보를 확인
                        for(var j=0; j<tweetmediaInfo.length; j++){
                            // 매칭되는 사진의 media_key의 URL을 넣어줌
                            if((media_key === tweetmediaInfo[j].media_key) && (tweetmediaInfo[j].type === "photo")){
                                try{
                                    media_info_list[i].media_key = tweetmediaInfo[j].media_key;
                                }catch{
                                    media_info_list[i].media_key = "";
                                }
                                try{
                                    media_info_list[i].url = tweetmediaInfo[j].url;
                                }catch{
                                    media_info_list[i].url = "";
                                }
                            }
                        }
                    }
                }
            };
            if(user_info_list != []){
                setTemp1(user_info_list);
                console.log("user_info_list", user_info_list);
            }
            if(media_info_list != []){
                setTemp2(media_info_list);
                console.log("media_info_list", media_info_list);
            }
        }
    };

    // ----------------------------------- [ useEffect ] -----------------------------------
    useEffect(()=>{
        loadTweet(); // 트위터 글 불러오기
    }, []);
    useEffect(()=>{
        setTweetInfo(); // 사용자, 사진 정보 세팅1
    }, [tweets, tweetUserInfo, tweetmediaInfo]);
    useEffect(()=>{  // 사용자, 사진 정보 세팅2
        setTweetUserInfoList(temp1);
        setTweetMediaInfoList(temp2);
        console.log("STATE tweets", tweets);
        console.log("STATE tweetUserInfo", tweetUserInfoList);
        console.log("STATE tweetmediaInfo", tweetmediaInfoList);
    }, [temp1, temp2])

    return (
        <div>
            <div className='flex'>
                <img className='twitter-logo' src="https://blog.kakaocdn.net/dn/AcIGI/btqxtp2xkg2/EGABG3i2NAMq3kRu1VaGzk/img.jpg" alt="twitter_logo" />
                <h5>
                    # {randomRegion}구
                </h5>
            </div>
    
            <div className='margin_box mb-130'>
                <div className='h_row2'>
                    {/* <div className='single_box'>
                        <img className='snsimg' src="https://blog.kakaocdn.net/dn/CHb0U/btqxrW04Y5b/mzimBHhLuGMBYvCS33uyh0/img.jpg" alt="insta_logo" />
                    </div>
                    
                    
                    <div className='single_box'>
                        <img className='snsimg' src="https://blog.kakaocdn.net/dn/AcIGI/btqxtp2xkg2/EGABG3i2NAMq3kRu1VaGzk/img.jpg" alt="twitter_logo" />
                    </div>  */}
                    {/* <MainTwitter></MainTwitter> */}
                    <RecentTweets/>
                    {/* <div>{tweets}</div> */}
                </div>
            </div>
        </div>
    )
}

export default MainSns