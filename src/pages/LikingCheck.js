import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap'
import axios from 'axios';

import Layout from '../layouts/Layout'
import '../css/main.css';
import './Profile.css';

// [ 각 키워드 재사용 컴포넌트 ]
const ClickKeyword = (props) => {
    return (
        <div className='items-center justify-center mr-35'>
            <div
                // 키워드 클릭 시 state값 변경
                onClick={(event)=>{
                    event.preventDefault();
                    if(props.targetState === false){
                        props.targetSetState(true);
                    } else{
                        props.targetSetState(false);
                    }}
                }
                className='relative rounded overflow-hidden w-60 h-60'
            >
                <img
                    // 해당하는 키워드의 state 값에 따라 표시
                    style={props.targetState ? {border: "5px solid rgb(250, 150, 0)", borderRadius: "20%"} : {}}
                    src={props.KeywordImage} alt={props.KeywordAlt} className='align-top'
                />
            </div>
            <div className='relative flex flex_col items-center'>
                <h6>{props.KeywordName}</h6>
            </div>
        </div>
    );
};

// [ LikingCheck 메인 컴포넌트 ]
const LikingCheck = () => {
  // [ State ]
  const [nickname, setNickname] = useState("");
  // 취향 설정 여부
  const [restaurantKorea, setRestaurantKorea] = useState(false);
  const [restaurantWest , setRestaurantWest] =  useState(false);
  const [restaurantChina, setRestaurantChina] = useState(false);
  const [restaurantJapan, setRestaurantJapan] = useState(false);
  const [restaurantFast , setRestaurantFast] =  useState(false);
  const [restaurantBunsik, setRestaurantBunsik] = useState(false);
  const [cafeCafe, setCafeCafe] = useState(false);
  const [cafeDessert, setCafeDessert] = useState(false);
  const [cafeBakery, setCafeBakery] = useState(false);
  const [leisureGallery, setLeisureGallery] = useState(false);
  const [leisureCraft, setLeisureCraft] = useState(false);
  const [leisurePopup , setLeisurePopup] = useState(false);
  const [leisureTheater, setLeisureTheater] = useState(false);
  const [leisureBook, setLeisureBook] = useState(false);
  const [leisureDepartment, setLeisureDepartment] = useState(false);
  const [walkingPark, setWalkingPark] = useState(false);
  const [walkingMarket, setWalkingMarket] = useState(false);
  const [walkingStreet, setWalkingStreet] = useState(false);

  const token = localStorage.getItem("token"); // 사용자 토큰

  // [ 함수 ]
  const goBackProfile = () => { // 프로필 수정으로 돌아가기
    window.location.replace('http://localhost:3000/profile');
  };

  const pressKeywordSave = (event) => { // 키워드 수정 내용 저장 버튼 클릭 시
    event.preventDefault();
    console.log("[LikingCheck.js] ==> pressKeywordSave called...");
    var profileForm = {
       "restaurant_korea" : restaurantKorea, 
       "restaurant_west" : restaurantWest, 
       "restaurant_china" : restaurantChina, 
       "restaurant_japan" : restaurantJapan, 
       "restaurant_fast" : restaurantFast, 
       "restaurant_bunsik" : restaurantBunsik,
       "cafe_cafe" : cafeCafe,
       "cafe_dessert" : cafeDessert,
       "cafe_bakery" : cafeBakery,
       "leisure_gallery" : leisureGallery,
       "leisure_craft" : leisureCraft,
       "leisure_popup" : leisurePopup,
       "leisure_theater" : leisureTheater,
       "leisure_book" : leisureBook,
       "leisure_department" : leisureDepartment,
       "walking_park" : walkingPark,
       "walking_market" : walkingMarket,
       "walking_street" : walkingStreet,
    }
    axios
      .patch("http://localhost:8000/users/profile/", profileForm, {
        headers: {
            "Authorization": `Token ${token}`
        },
      })
      .then((response)=>{
        if(response.status < 300) {
            alert("취향 정보가 수정되었습니다!");
            window.location.replace('http://localhost:3000');
        }
      })
      .catch((error)=>{
        console.log(error);
        alert("수정 도중 문제가 발생했습니다.");
      })
  }

  useEffect(()=>{
    // 사용자 취향 정보 불러오기
    console.log("[LikingCheck.js] ==> Loading profile...");
    axios
      .get("http://localhost:8000/users/profile/", {
        headers: {
          "Authorization": `Token ${token}`
        }
      })
      .then((response)=>{
        console.log(response.data);
        setNickname(response.data.nickname);
        setRestaurantKorea(response.data.restaurant_korea);
        setRestaurantWest(response.data.restaurant_west);
        setRestaurantChina(response.data.restaurant_china);
        setRestaurantJapan(response.data.restaurant_japan);
        setRestaurantFast(response.data.restaurant_fast);
        setRestaurantBunsik(response.data.restaurant_bunsik);
        setCafeCafe(response.data.cafe_cafe);
        setCafeDessert(response.data.cafe_dessert);
        setCafeBakery(response.data.cafe_bakery);
        setLeisureGallery(response.data.leisure_gallery);
        setLeisureCraft(response.data.leisure_craft);
        setLeisurePopup(response.data.leisure_popup);
        setLeisureTheater(response.data.leisure_theater);
        setLeisureBook(response.data.leisure_book);
        setLeisureDepartment(response.data.leisure_department);
        setWalkingPark(response.data.walking_park);
        setWalkingMarket(response.data.walking_market);
        setWalkingStreet(response.data.walking_street);
      })
      .catch((error)=>{
        console.log(error);
        alert("프로필 정보를 불러오는 데 문제가 생겼습니다.");
      })
  },[]);

  return (
    <Layout>
        <Container className='container_style' style={{minHeight: "75vh"}}>
            <div className='h_column_center'>
                <h3>
                    {/* <button
                        class="moveButton"
                        type="submit"
                        onClick={goBackProfile}
                    >
                        이전 화면으로
                    </button> */}
                    <span>{nickname}님의 취향 설정</span>
                </h3>
            </div>
            <div className='flex flex_col w mt-4 m-0a'>
                <div>
                    <div className='mb'>
                        <h5 className='flex mb-23'>먹기</h5>
                        <div className='flex items-center w-auto'>
                            <ClickKeyword
                              KeywordName="한식"
                              KeywordImage={require('../img/rice.png')}
                              KeywordAlt='rice_pic'
                              targetState={restaurantKorea}
                              targetSetState={setRestaurantKorea}
                            />
                            <ClickKeyword
                              KeywordName="양식"
                              KeywordImage={require('../img/pasta.png')}
                              KeywordAlt='pasta_pic'
                              targetState={restaurantWest}
                              targetSetState={setRestaurantWest}
                            />
                            <ClickKeyword
                              KeywordName="중식"
                              KeywordImage={require('../img/jjajang.png')}
                              KeywordAlt='jjajang_pic'
                              targetState={restaurantChina}
                              targetSetState={setRestaurantChina}
                            />
                            <ClickKeyword
                              KeywordName="일식"
                              KeywordImage={require('../img/sushi.png')}
                              KeywordAlt='sushi_pic'
                              targetState={restaurantJapan}
                              targetSetState={setRestaurantJapan}
                            />
                            <ClickKeyword
                              KeywordName="분식"
                              KeywordImage={require('../img/tteok.png')}
                              KeywordAlt='tteok_pic'
                              targetState={restaurantBunsik}
                              targetSetState={setRestaurantBunsik}
                            />
                            <ClickKeyword
                              KeywordName="패스트푸드"
                              KeywordImage={require('../img/burger.png')}
                              KeywordAlt='burger_pic'
                              targetState={restaurantFast}
                              targetSetState={setRestaurantFast}
                            />
                        </div>
                    </div>
                    <hr></hr>

                    <div className='mb'>
                        <h5 className='flex mb-23'>마시기</h5>
                        <div className='flex items-center w-auto'>
                            <ClickKeyword
                              KeywordName="카페"
                              KeywordImage={require('../img/coffee.png')}
                              KeywordAlt='coffee_pic'
                              targetState={cafeCafe}
                              targetSetState={setCafeCafe}
                            />
                            <ClickKeyword
                              KeywordName="디저트"
                              KeywordImage={require('../img/cake.png')}
                              KeywordAlt='cake_pic'
                              targetState={cafeDessert}
                              targetSetState={setCafeDessert}
                            />
                            <ClickKeyword
                              KeywordName="베이커리"
                              KeywordImage={require('../img/bread.png')}
                              KeywordAlt='bread_pic'
                              targetState={cafeBakery}
                              targetSetState={setCafeBakery}
                            />      
                        </div>
                    </div>
                    <hr></hr>

                    <div className='mb'>
                        <h5 className='flex mb-23'>놀기</h5>
                        <div className='flex items-center w-auto'>
                            <ClickKeyword
                              KeywordName="전시관"
                              KeywordImage={require('../img/art.png')}
                              KeywordAlt='art_pic'
                              targetState={leisureGallery}
                              targetSetState={setLeisureGallery}
                            />
                            <ClickKeyword
                              KeywordName="공방"
                              KeywordImage={require('../img/hammer.png')}
                              KeywordAlt='hammer_pic'
                              targetState={leisureCraft}
                              targetSetState={setLeisureCraft}
                            />
                            <ClickKeyword
                              KeywordName="팝업스토어"
                              KeywordImage={require('../img/store.png')}
                              KeywordAlt='store_pic'
                              targetState={leisurePopup}
                              targetSetState={setLeisurePopup}
                            />
                            <ClickKeyword
                              KeywordName="영화관"
                              KeywordImage={require('../img/movie.png')}
                              KeywordAlt='movie_pic'
                              targetState={leisureTheater}
                              targetSetState={setLeisureTheater}
                            />
                            <ClickKeyword
                              KeywordName="서점"
                              KeywordImage={require('../img/book.png')}
                              KeywordAlt='book_pic'
                              targetState={leisureBook}
                              targetSetState={setLeisureBook}
                            />
                            <ClickKeyword
                              KeywordName="쇼핑몰"
                              KeywordImage={require('../img/shopping.png')}
                              KeywordAlt='shopping_pic'
                              targetState={leisureDepartment}
                              targetSetState={setLeisureDepartment}
                            />
                        </div>
                    </div>
                    <hr></hr>

                    <div className='mb'>
                        <h5 className='flex mb-23'>걷기</h5>
                        <div className='flex items-center w-auto'>
                            <ClickKeyword
                              KeywordName="공원"
                              KeywordImage={require('../img/park.png')}
                              KeywordAlt='park_pic'
                              targetState={walkingPark}
                              targetSetState={setWalkingPark}
                            />
                            <ClickKeyword
                              KeywordName="시장"
                              KeywordImage={require('../img/market.png')}
                              KeywordAlt='market_pic'
                              targetState={walkingMarket}
                              targetSetState={setWalkingMarket}
                            />
                            <ClickKeyword
                              KeywordName="거리"
                              KeywordImage={require('../img/walk.png')}
                              KeywordAlt='walk_pic'
                              targetState={walkingStreet}
                              targetSetState={setWalkingStreet}
                            />   
                        </div>
                    </div>
                    <hr></hr>

            <div className='mb-23 m-0a m-tb d-table'>
                <button
                    type="button"
                    className='btn btn-warning btn_view'
                    onClick={pressKeywordSave}
                >
                    취향 설정 완료
                </button>
            </div>    
                    

                </div>
            </div>
        </Container>
    </Layout>
  )
}

export default LikingCheck