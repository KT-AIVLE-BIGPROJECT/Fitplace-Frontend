import React, {useState, useEffect} from 'react'
import {Container} from 'react-bootstrap'
import SearchPlace from './SearchPlace'
import Layout from '../layouts/Layout'
import axios from 'axios'
import './SignUp.css';
// 화면 상단 카테고리 버튼 컴포넌트
const CategoryButton = (props) => {
    return (
        <div className='items-center justify-center mr-60'>
            <div className='relative rounded overflow-hidden w-60 h-60 img-hover z-idx'>
                <img src={props.src} alt='rice_pic' className='align-top' />
            </div>
            <div className='relative flex flex_col items-center'>
                <h6>{props.category}</h6>
            </div>
        </div>
    )
};

// 필터링 버튼 컴포넌트
const FilterButton = (props) => {
    return (
        <div className='h_row_center2'>
            <div className='flex mr-60 sort-box z-idx'>
                <h6 className='sort-text'>{props.how}</h6>
                <img src="https://s3.hourplace.co.kr/web/images/icon/sort.svg" alt='arrow_pic' className='arrow-size sort-img' />
            </div>
        </div>
    )
};

// 추천 장소 박스 컴포넌트
const RecommendBox = (props) => {
    var midCategory = "";
    var keywords = props.keywords;
    var keywords_list;
    var is_keywords = true;
    switch(props.search_category){
        case "한식":
        case "양식":
        case "중식":
        case "일식":
        case "패스트푸드":
        case "분식":
            midCategory = "먹기";
            break;
        case "카페":
        case "디저트카페":
        case "베이커리":
            midCategory = "마시기";
            break;
        case "전시관":
        case "공방":
        case "팝업스토어":
        case "극장":
        case "서점":
        case "복합쇼핑몰":
            midCategory = "놀기";
            break;
        case "공원":
        case "시장":
        case "거리":
            midCategory = "걷기";
            break;
    }
    if(keywords != "no result"){ // 리뷰 요약 키워드가 있으면 
        // [ ] ' 제거해주고 공백 기준으로 문자열 스플릿
        keywords = keywords.replace('[', '');
        keywords = keywords.replace(']', '');
        keywords = keywords.replace(/\'/g, '');
        keywords_list = keywords.split(' ', 3);
        // console.log(typeof(keywords));
        // console.log(keywords.length);
        // console.log(keywords);
    } else { // 리뷰 요약 키워드가 없으면
        is_keywords = false;
    }

    const KeywordBox = (props) => {
        if(props.is_keywords === false){ // 리뷰 요약 키워드가 없으면
            return (
                <div className='flex-row' style={{display: "flex"}}>
                    <div className='mr-15 keyword-box'>
                        <h6 className='keyword-font'>리뷰 수가 부족합니다.</h6>    
                    </div>
                </div>

            )
        } else { // 리뷰 요약 키워드가 있으면
            return (
                <div class='flex-row'>
                    {keywords_list.map((kwd, idx) => {
                        return (
                            <div className='mr-15 keyword-box'>
                                <h6 className='keyword-font'>#{kwd}</h6>
                            </div>
                        );
                    })}
                </div>
            )
        }
    }

    return (
        <div className='single_box'>
            <img className='hotimg' src={props.photo} alt="profile" />
            <div className='namebox'>
                <h6 className='area_cat'>{midCategory} / {props.search_category}</h6>
                <div className='flex_row'>
                    <h6>{props.name}</h6>
                    <div className='flex'>
                        <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                        <h6 className='star_rank'>{props.rating}</h6>
                    </div>
                </div>
                <h6 className='area_cat'>{props.address}</h6>
                <KeywordBox is_keywords={is_keywords}/>
                {/* <div className='mr-15 keyword-box'>
                    <h6 className='keyword-font'>#{keywords_list[0]}</h6>    
                </div>
                <div className='mr-15 keyword-box'>
                    <h6 className='keyword-font'>#{keywords_list[1]}</h6>    
                </div>
                <div className='mr-15 keyword-box'>
                    <h6 className='keyword-font'>#{keywords_list[2]}</h6>    
                </div> */}
            </div>
        </div>
    )
}

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
    const [recommendPlaces, setRecommendPlaces] = useState(0);

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
                    console.log("AGE 10 SET");
                    break;
                case "age_20":
                    setAge20(1);
                    console.log("AGE 20 SET");
                    break;
                case "age_30":
                    setAge30(1);
                    console.log("AGE 30 SET");
                    break;
                case "age_40":
                    setAge40(1);
                    console.log("AGE 40 SET");
                    break;
                case "age_50":
                    setAge50(1);
                    console.log("AGE 50 SET");
                    break;
                case "age_60":
                    setAge60(1);
                    console.log("AGE 60 SET");
                    break;
                default:
                    break;
            }
            // 성별 설정
            switch(response.data.gender) {
                case 'gender_male':
                    setMale(1);
                    console.log("GENDER MALE SET");
                    break;
                case 'gender_female':
                    setFemale(1);
                    console.log("GENDER FEMALE SET");
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
                    console.log("MBTI IS__ SET");
                    break;
                case 'mbti_intj':
                case 'mbti_intp':
                case 'mbti_infj':
                case 'mbti_infp':
                    setMbtiIN(1);
                    console.log("MBTI IN__ SET");
                    break;
                case 'mbti_estj':
                case 'mbti_estp':
                case 'mbti_esfj':
                case 'mbti_esfp':
                    setMbtiES(1);
                    console.log("MBTI ES__ SET");
                    break;
                case 'mbti_entj':
                case 'mbti_entp':
                case 'mbti_enfj':
                case 'mbti_enfp':
                    setMbtiEN(1);
                    console.log("MBTI EN__ SET");
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
        })
    }

    const getRecommend = (userform) => {
        console.log("USERFORM SET");
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
        console.log(userform);
        console.log("[Search.js] ==> Recommended places loading...");
        axios
            .post("http://localhost:8000/recommendations/", userform, {
            headers: {
                "Authorization": `Token ${token}`
            }
            })
            .then((response)=>{
                setRecommendPlaces(response.data);
                // console.log(typeof(recommendPlaces));
                // console.log(recommendPlaces.name[0]);
                // console.log(recommendPlaces.photo[0]);
                // console.log(recommendPlaces.search_category[0]);
                // console.log(recommendPlaces.rating[0]);
                // console.log(recommendPlaces.address[0]);
                // console.log(recommendPlaces.review_keywords[0]);
            })
    }
    
    // 처음에 사용자 정보 불러올 때 닉네임 정보로 세팅해주고, 이 값이 변할때만 useEffect 실행
    useEffect(()=>{
        getProfile();
        getRecommend();
    }, [effectFlag]);

  if(recommendPlaces != 0){
    return (
        <Layout>
          <Container className='container_style' style={{minHeight: "75vh"}}>
            <div className='flex flex_col w mt-4 m-0a'>
              <div className='flex h-60'>
              </div>
              <div className='mb-50'>
                <div className='flex items-center w-auto'>
                    <CategoryButton src={require('../img/all.png')} category="전체"/>
                    <CategoryButton src={require('../img/eat.png')} category="먹기"/>
                    <CategoryButton src={require('../img/drink.png')} category="마시기"/>
                    <CategoryButton src={require('../img/game.png')} category="놀기"/>
                    <CategoryButton src={require('../img/running.png')} category="걷기"/>
                </div>
              </div>
              
            </div>
    
            <div>
                <div className='margin_box mb-130'>
                            
                <div className='flex h-60 right-sort mb-23'>
                    {/* <button onClick={console.log(recommendPlaces)}/> */}
                    <FilterButton how="평점순"/>
                    <FilterButton how="리뷰순"/>
                </div>
                
                <div className='h_row'>
                    <RecommendBox
                        photo={recommendPlaces.photo[0]}
                        search_category={recommendPlaces.search_category[0]}
                        name={recommendPlaces.name[0]}
                        rating={recommendPlaces.rating[0]}
                        address={recommendPlaces.address[0]}
                        keywords={recommendPlaces.review_keywords[0]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[1]}
                        search_category={recommendPlaces.search_category[1]}
                        name={recommendPlaces.name[1]}
                        rating={recommendPlaces.rating[1]}
                        address={recommendPlaces.address[1]}
                        keywords={recommendPlaces.review_keywords[1]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[2]}
                        search_category={recommendPlaces.search_category[2]}
                        name={recommendPlaces.name[2]}
                        rating={recommendPlaces.rating[2]}
                        address={recommendPlaces.address[2]}
                        keywords={recommendPlaces.review_keywords[2]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[3]}
                        search_category={recommendPlaces.search_category[3]}
                        name={recommendPlaces.name[3]}
                        rating={recommendPlaces.rating[3]}
                        address={recommendPlaces.address[3]}
                        keywords={recommendPlaces.review_keywords[3]}
                    />
                </div>
            </div>
    
            <div className='margin_box mb-130'>
                <div className='h_row'>
                    <RecommendBox
                        photo={recommendPlaces.photo[4]}
                        search_category={recommendPlaces.search_category[4]}
                        name={recommendPlaces.name[4]}
                        rating={recommendPlaces.rating[4]}
                        address={recommendPlaces.address[4]}
                        keywords={recommendPlaces.review_keywords[4]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[5]}
                        search_category={recommendPlaces.search_category[5]}
                        name={recommendPlaces.name[5]}
                        rating={recommendPlaces.rating[5]}
                        address={recommendPlaces.address[5]}
                        keywords={recommendPlaces.review_keywords[5]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[6]}
                        search_category={recommendPlaces.search_category[6]}
                        name={recommendPlaces.name[6]}
                        rating={recommendPlaces.rating[6]}
                        address={recommendPlaces.address[6]}
                        keywords={recommendPlaces.review_keywords[6]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[7]}
                        search_category={recommendPlaces.search_category[7]}
                        name={recommendPlaces.name[7]}
                        rating={recommendPlaces.rating[7]}
                        address={recommendPlaces.address[7]}
                        keywords={recommendPlaces.review_keywords[7]}
                    />
                </div>
            </div>
    
            </div>
              
          </Container>
        </Layout>
      )
  } else {
    return (
        <div>추천 장소를 불러오는 중입니다...</div>
    )
  }
}

export default Search