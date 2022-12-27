import React, {useState, useEffect} from 'react'
import {Container} from 'react-bootstrap'
import SearchPlace from './SearchPlace'
import Layout from '../layouts/Layout'
import axios from 'axios'

const Search = () => {
    const [effectFlag, setEffectFlag] = useState("");
    // 추천 시 넘겨줄 값
    const [age10, setAge10] = useState(0);
    const [age20, setAge20] = useState(0);
    const [age30, setAge30] = useState(0);
    const [age40, setAge40] = useState(0);
    const [age50, setAge50] = useState(0);
    const [age60, setAge60] = useState(0);
    const [male, setMale] = useState(0);
    const [female, setFemale] = useState(0);
    const [mbtiIS, setMbtiIS] = useState(0);
    const [mbtiIN, setMbtiIN] = useState(0);
    const [mbtiES, setMbtiES] = useState(0);
    const [mbtiEN, setMbtiEN] = useState(0);
    const [resKorea, setResKorea] = useState(0);
    const [resWest, setResWest] = useState(0);
    const [resChina, setResChina] = useState(0);
    const [resJapan, setResJapan] = useState(0);
    const [resFast, setResFast] = useState(0);
    const [resBunsik, setResBunsik] = useState(0);
    const [cafe, setCafe] = useState(0);
    const [dessert, setDessert] = useState(0);
    const [bakery, setBakery] = useState(0);
    const [leiGallery, setLeiGallery] = useState(0);
    const [leiCraft, setLeiCraft] = useState(0);
    const [leiPopup, setLeiPopup] = useState(0);
    const [leiTheater, setLeiTheater] = useState(0);
    const [leiBook, setLeiBook] = useState(0);
    const [leiDepartment, setLeiDepartment] = useState(0);
    const [walPark, setWalPark] = useState(0);
    const [walMarket, setWalMarket] = useState(0);
    const [walStreet, setWalStreet] = useState(0);

    // 추천받은 장소 리스트
    const [recommenPlaces, setRecommendPlaces] = useState([]);

    const token = sessionStorage.getItem("token"); // 사용자 토큰

    const getProfile = () => {
        // 사용자의 프로필 정보를 먼저 불러온다.
        console.log("[Search.js] ==> Loading profile...");
        axios
        .get("http://localhost:8000/users/profile/", {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then((response) => {
            setEffectFlag(response.data.nickname);
            // 연령대 설정
            switch(response.data.age) {
                case "age_10":
                    setAge10(1);
                    console.log("AGE SET");
                    break;
                case "age_20":
                    setAge20(1);
                    console.log("AGE SET", age20);
                    break;
                case "age_30":
                    setAge30(1);
                    console.log("AGE SET");
                    break;
                case "age_40":
                    setAge40(1);
                    console.log("AGE SET");
                    break;
                case "age_50":
                    setAge50(1);
                    console.log("AGE SET");
                    break;
                case "age_60":
                    setAge60(1);
                    console.log("AGE SET");
                    break;
                default:
                    break;
            }
            // 성별 설정
            switch(response.data.gender) {
                case 'gender_male':
                    setMale(1);
                    console.log("GENDER SET", male);
                    break;
                case 'gender_female':
                    setFemale(1);
                    console.log("GENDER SET");
                    break;
                default:
                    break;
            }
            // MBTI 설정
            switch(response.data.mbti) {
                case 'mbti_istj':
                case 'mbti_istp':
                case 'mbti_isfj':
                case 'mbti_isfp':
                    setMbtiIS(1);
                    console.log("MBTI SET", mbtiIS);
                    break;
                case 'mbti_intj':
                case 'mbti_intp':
                case 'mbti_infj':
                case 'mbti_infp':
                    setMbtiIN(1);
                    console.log("MBTI SET");
                    break;
                case 'mbti_estj':
                case 'mbti_estp':
                case 'mbti_esfj':
                case 'mbti_esfp':
                    setMbtiES(1);
                    console.log("MBTI SET");
                    break;
                case 'mbti_entj':
                case 'mbti_entp':
                case 'mbti_enfj':
                case 'mbti_enfp':
                    setMbtiEN(1);
                    console.log("MBTI SET");
                    break;
                default:
                    break;
            }
            // 키워드 설정
            setResKorea(response.data.restaurant_korea);
            setResWest(response.data.restaurant_west);
            setResChina(response.data.restaurant_china);
            setResJapan(response.data.restaurant_japan);
            setResFast(response.data.restaurant_fast);
            setResBunsik(response.data.restaurant_bunsik);
            setCafe(response.data.cafe_cafe);
            setDessert(response.data.cafe_dessert);
            setBakery(response.data.cafe_bakery);
            setLeiGallery(response.data.leisure_gallery);
            setLeiCraft(response.data.leisure_craft);
            setLeiPopup(response.data.leisure_popup);
            setLeiTheater(response.data.leisure_theater);
            setLeiBook(response.data.leisure_book);
            setLeiDepartment(response.data.leisure_department);
            setWalPark(response.data.walking_park);
            setWalMarket(response.data.walking_market);
            setWalStreet(response.data.walking_street);
            console.log("KEYWORD SET", resKorea);
            var userform = {
                "age_10": age10,
                "age_20": age20,
                "age_30": age30,
                "age_40": age40,
                "age_50": age50,
                "age_60": age60,
                "gender_male": male,
                "gender_female": female,
                "mbti_is": mbtiIS,
                "mbti_in": mbtiIN,
                "mbti_es": mbtiES,
                "mbti_en": mbtiEN,
                "restaurant_korea": resKorea,
                "restaurant_west": resWest,
                "restaurant_china": resChina,
                "restaurant_japan": resJapan,
                "restaurant_fast": resFast,
                "restaurant_bunsik": resBunsik,
                "cafe_cafe": cafe,
                "cafe_dessert": dessert,
                "cafe_bakery": bakery,
                "leisure_gallery": leiGallery,
                "leisure_craft": leiCraft,
                "leisure_popup": leiPopup,
                "leisure_theater": leiTheater,
                "leisure_book": leiBook,
                "leisure_department": leiDepartment,
                "walking_park": walPark,
                "walking_market": walMarket,
                "walking_street": walStreet
            }
            console.log("USERFORM SET");
            getRecommend(userform);
        })
    }

    const getRecommend = (userform) => {
        console.log(userform);
        console.log("[Search.js] ==> Recommended places loading...");
        axios
            .post("http://localhost:8000/recommendations/", userform, {
            headers: {
                "Authorization": `Token ${token}`
            }
            })
            .then((response)=>{
                // console.log(response.data);
                // console.log(typeof(response.data));
                setRecommendPlaces(response.data);
                console.log(recommenPlaces);
                console.log(recommenPlaces[0]);
                console.log(recommenPlaces[1]);
                console.log(recommenPlaces[2]);
                console.log(recommenPlaces[3]);
                console.log(recommenPlaces[4]);
            })
    }
    
    // 처음에 사용자 정보 불러올 때 닉네임 정보로 세팅해주고, 이 값이 변할때만 useEffect 실행
    useEffect(()=>{
        getProfile();
    }, [effectFlag]);

  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <div className='flex flex_col w mt-4 m-0a'>
          <div className='flex h-60'>
          </div>
          <div className='mb-50'>
            <div className='flex items-center w-auto'>
              <div className='items-center justify-center mr-60'>
                  <div className='relative rounded overflow-hidden w-60 h-60 img-hover z-idx'>
                      <img src={require('../img/all.png')} alt='rice_pic' className='align-top' />
                  </div>
                  <div className='relative flex flex_col items-center'>
                      <h6>전체</h6>
                  </div>
              </div>

              <div className='items-center justify-center mr-60'>
                  <div className='relative rounded overflow-hidden w-60 h-60 img-hover z-idx'>
                      <img src={require('../img/eat.png')} alt='rice_pic' className='align-top' />
                  </div>
                  <div className='relative flex flex_col items-center'>
                      <h6>먹기</h6>
                  </div>
              </div>

              <div className='items-center justify-center mr-60'>
                  <div className='relative rounded overflow-hidden w-60 h-60 img-hover z-idx'>
                      <img src={require('../img/drink.png')} alt='rice_pic' className='align-top' />
                  </div>
                  <div className='relative flex flex_col items-center'>
                      <h6>마시기</h6>
                  </div>
              </div>

              <div className='items-center justify-center mr-60'>
                  <div className='relative rounded overflow-hidden w-60 h-60 img-hover z-idx'>
                      <img src={require('../img/game.png')} alt='rice_pic' className='align-top' />
                  </div>
                  <div className='relative flex flex_col items-center'>
                      <h6>놀기</h6>
                  </div>
              </div>

              <div className='items-center justify-center mr-60'>
                  <div className='relative rounded overflow-hidden w-60 h-60 img-hover z-idx'>
                      <img src={require('../img/running.png')} alt='rice_pic' className='align-top' />
                  </div>
                  <div className='relative flex flex_col items-center'>
                      <h6>걷기</h6>
                  </div>
              </div>
            </div>
          </div>
          
        </div>
        <SearchPlace />
          
      </Container>
    </Layout>
  )
}

export default Search