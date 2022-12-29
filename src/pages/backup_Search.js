// 사용XXXXXXX

import React, {useState, useEffect} from 'react'
import {Container} from 'react-bootstrap'
import SearchPlace from './SearchPlace'
import Layout from '../layouts/Layout'
import axios from 'axios'
import './SignUp.css';

import { useNavigate } from 'react-router-dom';

// 추천 장소 박스 컴포넌트
const RecommendBox = (props) => {
    const navigate = useNavigate();
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
    } else { // 리뷰 요약 키워드가 없으면
        is_keywords = false;
    }

    const KeywordBox = (props) => {
        if(props.is_keywords === false){ // 리뷰 요약 키워드가 없으면
            return (
                <div className='flex-row' style={{display: "flex"}}>
                    <div className='mr-15 keyword-box'>
                        <h6 className='keyword-font'>리뷰X</h6>    
                    </div>
                </div>

            )
        } else { // 리뷰 요약 키워드가 있으면
            return (
                <div className='flex-row'>
                    {keywords_list.map((kwd, idx) => {
                        return (
                            <div key={idx} className='mr-15 keyword-box'>
                                <h6 key={idx} className='keyword-font'>#{kwd}</h6>
                            </div>
                        );
                    })}
                </div>
            )
        }
    }

    return (
        // 새 탭 여는걸로 바꿔보기
        <div className='single_box' onClick={()=>{navigate(`/detailpage/:${props.place_code}`,{state:{place_code:props.place_code}});}}>
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
            </div>
        </div>
    )
}

const Search = () => {
    // 요청 유효성 검증 state (사용자 프로필 받아온 후 닉네임값으로 세팅 되면 추천 응답 받도록)
    const [effectFlag, setEffectFlag] = useState(-1);
    // 필터링 관련 state
    const [mainCategory, setMainCategory] = useState("all"); // 대분류 필터링
    // const [midCategory, setMidCategory] = useState(""); // 중분류 필터링
    const [filterRating, setFilterRating] = useState(0); // 1: 높은 순 / 2: 낮은 순
    const [filterReview, setFilterReview] = useState(0);
    const [filterRegion, setFilterRegion] = useState("강남구"); // 지역구 필터링

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

    // 페이지네이션
    const [placeIdx, setPlaceIdx] = useState(0);
    const [totalIdx, setTotalIdx] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    

    const token = sessionStorage.getItem("token"); // 사용자 토큰

    // 사용자 프로필 정보 불러오는 함수
    const getProfile = async () => {
        const response = await axios.get(
            "http://localhost:8000/users/profile/", {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        )
        console.log("[Search.js] ==> Loading profile...", response);
        setEffectFlag(response.data.nickname);
        // 연령대 설정
        switch(response.data.age){
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
        switch(response.data.gender){
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
        switch(response.data.mbti){
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
        console.log("KEYWORD SET");
    };

    // 추천 장소 불러오는 함수
    const getRecommend = async () => {
        console.log("USERFORM SET");
        var body = {
            "userform" : {
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
            },

            "filter_region": filterRegion,

            "main_category": mainCategory,
            //"mid_category": midCategory,
            "filter_rating": filterRating,
            "filter_review": filterReview,

            "effect_flag": effectFlag,
        }
        //console.log(body);
        console.log("[Search.js] ==> Recommended places loading...", body);
        const response = await axios.post(
            `http://localhost:8000/recommendations/`, body, {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        )
        setRecommendPlaces(response.data);
        //setTotalIdx(parseInt(response.data.name.length / 20));
        setTotalIdx(response.data.name.length);
        setTotalPage(parseInt(response.data.name.length / 20) + 1)
        // console.log(typeof(recommendPlaces));
        // console.log(recommendPlaces.name[0]);
        // console.log(recommendPlaces.photo[0]);
        // console.log(recommendPlaces.search_category[0]);
        // console.log(recommendPlaces.rating[0]);
        // console.log(recommendPlaces.address[0]);
        // console.log(recommendPlaces.review_keywords[0]);
    };
    
    useEffect(()=>{
        getProfile();
    }, []);
    // 처음에 사용자 정보 불러올 때 닉네임 정보로 세팅해주고, 이 값이 변할때만 useEffect 실행
    useEffect(()=>{
        getRecommend();
    }, [effectFlag, mainCategory, filterRating, filterReview])

    // 화면 상단 카테고리 버튼 컴포넌트
    const CategoryButton = (props) => {
        return (
            <div className='items-center justify-center mr-60'>
                <div onClick={()=>{
                    props.clicked(props.value);
                    }} 
                    className='relative rounded overflow-hidden w-60 h-60 img-hover z-idx'
                >
                    <img src={props.src} alt='rice_pic' className='align-top' />
                </div>
                <div className='relative flex flex_col items-center'>
                    {/* <h6>{props.category}</h6> */}
                    <div className='flex'>
                        <div className='word_style'>{props.category}</div>
                    </div>
                </div>
            </div>
        )
    };

    // 필터링 버튼 컴포넌트
    const FilterButton = (props) => {
        return (
            <div className='h_row_center2'>
                <div
                    onClick={()=>{
                        if(props.targetState === 1){
                            props.targetSetState(2); // 2: 낮은 순
                        } else if(props.targetState === 2){
                            props.targetSetState(1); // 1: 높은 순
                        } else{ // 0일 때 (초기 상태)
                            props.targetSetState(1); // 1: 높은 순
                        }
                    }}
                    className='flex mr-60 sort-box z-idx'
                >
                    <h6 className='sort-text'>{props.how}</h6>
                    <img src="https://s3.hourplace.co.kr/web/images/icon/sort.svg" alt='arrow_pic' className='arrow-size sort-img' />
                </div>
            </div>
        )
    };

  if(recommendPlaces === 0){
    return (
        <div>추천 장소를 불러오는 중입니다...</div>
    )
  } else {
    return (
        <Layout>
          <Container className='container_style' style={{minHeight: "75vh"}}>
            <div className='flex flex_col w mt-4 m-0a'>
              <div className='flex h-60'>
              </div>
              <div className='mb-50'>
                <div className='flex items-center w-auto'>
                    {/* <div>{mainCategory}</div> */}
                    <CategoryButton src={require('../img/all.png')} category="전체" value="all" clicked={setMainCategory}/>
                    <CategoryButton src={require('../img/eat.png')} category="먹기" value="restaurant" clicked={setMainCategory}/>
                    <CategoryButton src={require('../img/drink.png')} category="마시기" value="cafe" clicked={setMainCategory}/>
                    <CategoryButton src={require('../img/game.png')} category="놀기" value="leisure" clicked={setMainCategory}/>
                    <CategoryButton src={require('../img/running.png')} category="걷기" value="walking" clicked={setMainCategory}/>
                </div>
              </div>
              
            </div>
    
            <div>
                <div className='margin_box mb-130'>
                            
                <div className='flex h-60 right-sort mb-23'>
                    {/* <button onClick={console.log(recommendPlaces)}/> */}
                    <FilterButton how="평점순" targetState={filterRating} targetSetState={setFilterRating} />
                    <FilterButton how="리뷰순" targetState={filterReview} targetSetState={setFilterReview} />
                </div>
                
                <div className='h_row'>
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 0]}
                        search_category={recommendPlaces.search_category[placeIdx + 0]}
                        name={recommendPlaces.name[placeIdx + 0]}
                        rating={recommendPlaces.rating[placeIdx + 0]}
                        address={recommendPlaces.address[placeIdx + 0]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 0]}
                        place_code={recommendPlaces.place_code[placeIdx + 0]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 1]}
                        search_category={recommendPlaces.search_category[placeIdx + 1]}
                        name={recommendPlaces.name[placeIdx + 1]}
                        rating={recommendPlaces.rating[placeIdx + 1]}
                        address={recommendPlaces.address[placeIdx + 1]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 1]}
                        place_code={recommendPlaces.place_code[placeIdx + 1]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 2]}
                        search_category={recommendPlaces.search_category[placeIdx + 2]}
                        name={recommendPlaces.name[placeIdx + 2]}
                        rating={recommendPlaces.rating[placeIdx + 2]}
                        address={recommendPlaces.address[placeIdx + 2]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 2]}
                        place_code={recommendPlaces.place_code[placeIdx + 2]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 3]}
                        search_category={recommendPlaces.search_category[placeIdx + 3]}
                        name={recommendPlaces.name[placeIdx + 3]}
                        rating={recommendPlaces.rating[placeIdx + 3]}
                        address={recommendPlaces.address[placeIdx + 3]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 3]}
                        place_code={recommendPlaces.place_code[placeIdx + 3]}
                    />
                </div>
            </div>
    
            <div className='margin_box mb-130'>
                <div className='h_row'>
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 4]}
                        search_category={recommendPlaces.search_category[placeIdx + 4]}
                        name={recommendPlaces.name[placeIdx + 4]}
                        rating={recommendPlaces.rating[placeIdx + 4]}
                        address={recommendPlaces.address[placeIdx + 4]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 4]}
                        place_code={recommendPlaces.place_code[placeIdx + 4]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 5]}
                        search_category={recommendPlaces.search_category[placeIdx + 5]}
                        name={recommendPlaces.name[placeIdx + 5]}
                        rating={recommendPlaces.rating[placeIdx + 5]}
                        address={recommendPlaces.address[placeIdx + 5]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 5]}
                        place_code={recommendPlaces.place_code[placeIdx + 5]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 6]}
                        search_category={recommendPlaces.search_category[placeIdx + 6]}
                        name={recommendPlaces.name[placeIdx + 6]}
                        rating={recommendPlaces.rating[placeIdx + 6]}
                        address={recommendPlaces.address[placeIdx + 6]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 6]}
                        place_code={recommendPlaces.place_code[placeIdx + 6]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 7]}
                        search_category={recommendPlaces.search_category[placeIdx + 7]}
                        name={recommendPlaces.name[placeIdx + 7]}
                        rating={recommendPlaces.rating[placeIdx + 7]}
                        address={recommendPlaces.address[placeIdx + 7]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 7]}
                        place_code={recommendPlaces.place_code[placeIdx + 7]}
                    />
                </div>
            </div>

            <div className='margin_box mb-130'>
                <div className='h_row'>
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 8]}
                        search_category={recommendPlaces.search_category[placeIdx + 8]}
                        name={recommendPlaces.name[placeIdx + 8]}
                        rating={recommendPlaces.rating[placeIdx + 8]}
                        address={recommendPlaces.address[placeIdx + 8]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 8]}
                        place_code={recommendPlaces.place_code[placeIdx + 8]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 9]}
                        search_category={recommendPlaces.search_category[placeIdx + 9]}
                        name={recommendPlaces.name[placeIdx + 9]}
                        rating={recommendPlaces.rating[placeIdx + 9]}
                        address={recommendPlaces.address[placeIdx + 9]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 9]}
                        place_code={recommendPlaces.place_code[placeIdx + 9]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 10]}
                        search_category={recommendPlaces.search_category[placeIdx + 10]}
                        name={recommendPlaces.name[placeIdx + 10]}
                        rating={recommendPlaces.rating[placeIdx + 10]}
                        address={recommendPlaces.address[placeIdx + 10]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 10]}
                        place_code={recommendPlaces.place_code[placeIdx + 10]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 11]}
                        search_category={recommendPlaces.search_category[placeIdx + 11]}
                        name={recommendPlaces.name[placeIdx + 11]}
                        rating={recommendPlaces.rating[placeIdx + 11]}
                        address={recommendPlaces.address[placeIdx + 11]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 11]}
                        place_code={recommendPlaces.place_code[placeIdx + 11]}
                    />
                </div>
            </div>

            <div className='margin_box mb-130'>
                <div className='h_row'>
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 12]}
                        search_category={recommendPlaces.search_category[placeIdx + 12]}
                        name={recommendPlaces.name[placeIdx + 12]}
                        rating={recommendPlaces.rating[placeIdx + 12]}
                        address={recommendPlaces.address[placeIdx + 12]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 12]}
                        place_code={recommendPlaces.place_code[placeIdx + 12]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 13]}
                        search_category={recommendPlaces.search_category[placeIdx + 13]}
                        name={recommendPlaces.name[placeIdx + 13]}
                        rating={recommendPlaces.rating[placeIdx + 13]}
                        address={recommendPlaces.address[placeIdx + 13]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 13]}
                        place_code={recommendPlaces.place_code[placeIdx + 13]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 14]}
                        search_category={recommendPlaces.search_category[placeIdx + 14]}
                        name={recommendPlaces.name[placeIdx + 14]}
                        rating={recommendPlaces.rating[placeIdx + 14]}
                        address={recommendPlaces.address[placeIdx + 14]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 14]}
                        place_code={recommendPlaces.place_code[placeIdx + 14]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 15]}
                        search_category={recommendPlaces.search_category[placeIdx + 15]}
                        name={recommendPlaces.name[placeIdx + 15]}
                        rating={recommendPlaces.rating[placeIdx + 15]}
                        address={recommendPlaces.address[placeIdx + 15]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 15]}
                        place_code={recommendPlaces.place_code[placeIdx + 15]}
                    />
                </div>
            </div>

            <div className='margin_box mb-130'>
                <div className='h_row'>
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 16]}
                        search_category={recommendPlaces.search_category[placeIdx + 16]}
                        name={recommendPlaces.name[placeIdx + 16]}
                        rating={recommendPlaces.rating[placeIdx + 16]}
                        address={recommendPlaces.address[placeIdx + 16]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 16]}
                        place_code={recommendPlaces.place_code[placeIdx + 16]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 17]}
                        search_category={recommendPlaces.search_category[placeIdx + 17]}
                        name={recommendPlaces.name[placeIdx + 17]}
                        rating={recommendPlaces.rating[placeIdx + 17]}
                        address={recommendPlaces.address[placeIdx + 17]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 17]}
                        place_code={recommendPlaces.place_code[placeIdx + 17]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 18]}
                        search_category={recommendPlaces.search_category[placeIdx + 18]}
                        name={recommendPlaces.name[placeIdx + 18]}
                        rating={recommendPlaces.rating[placeIdx + 18]}
                        address={recommendPlaces.address[placeIdx + 18]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 18]}
                        place_code={recommendPlaces.place_code[placeIdx + 18]}
                    />
                    <RecommendBox
                        photo={recommendPlaces.photo[placeIdx + 19]}
                        search_category={recommendPlaces.search_category[placeIdx + 19]}
                        name={recommendPlaces.name[placeIdx + 19]}
                        rating={recommendPlaces.rating[placeIdx + 19]}
                        address={recommendPlaces.address[placeIdx + 19]}
                        keywords={recommendPlaces.review_keywords[placeIdx + 19]}
                        place_code={recommendPlaces.place_code[placeIdx + 19]}
                    />
                </div>
            </div>
    
            {/* 이전페이지 버튼 */}
            <button onClick={()=>{
                if(placeIdx >= 20){
                    setPlaceIdx(placeIdx-20);
                    setCurrentPage(currentPage-1)
                }
            }}
            >
                &#60;&#60;&#60;
            </button>
            {/* 다음페이지 버튼 */}
            <button onClick={()=>{
                if(totalIdx > placeIdx){
                    setPlaceIdx(placeIdx+20);
                    setCurrentPage(currentPage+1)
                }
            }}>
                &#62;&#62;&#62;
            </button>
            <div>현재 페이지 : {currentPage} / {totalPage}</div>
            <div>현재 장소 인덱스 : {placeIdx}~{placeIdx + 19} / {totalIdx}</div>
            </div>
              
          </Container>
        </Layout>
      )
  }
}

export default Search