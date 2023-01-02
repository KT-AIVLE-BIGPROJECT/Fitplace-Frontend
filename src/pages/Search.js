import React, {useState, useEffect} from 'react'
import {Container} from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import SearchPlace from './SearchPlace'
import SearchBar from './SearchBar'
import Layout from '../layouts/Layout'
import axios from 'axios'
import './SearchBar.css'
import '../css/main.css'
import './Search.css'

import {useNavigate} from 'react-router-dom';

const Search = () => {
    // 요청 유효성 검증 state (사용자 프로필 받아온 후 닉네임값으로 세팅 되면 추천 응답 받도록)
    const [effectFlag, setEffectFlag] = useState(-1);
    // 추천 근거 사용자 정보 표시용
    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [mbti, setMbti] = useState("");

    // 필터링 관련 state
    const [mainCategory, setMainCategory] = useState("all"); // 대분류 필터링
    const [subCategory, setsubCategory] = useState(""); // 중분류 필터링
    const [subCategoryList, setSubCategoryList] = useState([]);
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
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalCount, setTotalCount] = useState(0); // 총 데이터 개수
    const [totalPage, setTotalPage] = useState(1); // 총 페이지 개수
    const [pageGroup, setPageGroup] = useState(1); // 현재 페이지 그룹
    const [firstNumber, setFirstNumber] = useState(1); // 현재 페이지 그룹의 첫번째 숫자
    const [lastNumber, setLastNumber] = useState(5); // 현재 페이지 그룹의 마지막 숫자
    const [prev, setPrev] = useState(0); // 왼쪽 화살표 누를 시 페이지 (<)
    const [next, setNext] = useState(6); // 오른쪽 화살표 누를 시 페이지 (>)
    const [pageGroupList, setPageGroupList] = useState([]); // 페이지네이션 버튼 그룹

    const [pageCount, setPageCount] = useState(5); // 화면에 나타날 페이지 개수(5개)
    const [limit, setLimit] = useState(24); // 한 페이지 당 나타낼 데이터 개수
    const [pageInfo, setPageInfo] = useState({}); // 페이지 갱신 작업용

    const token = sessionStorage.getItem("token"); // 사용자 토큰

    // -------------------------[ 컴포넌트 ]------------------------- 화면 상단 대분류 카테고리 버튼
    // 컴포넌트
    const CategoryButton = (props) => {
        return (
            <li className={props.className}>
                <div
                    onClick={() => {
                        setsubCategory("");
                        setFilterRating(0);
                        setFilterReview(0);
                        props.clicked(props.value);
                    }}
                    className='flex'>
                    <div className='word_style'>{props.label}</div>

                    <div className='items-center justify-center items-center'>
                        <div className='relative rounded overflow-hidden z-idx'>
                            <img src={props.src} alt={props.alt} className='align-top img-size'/>
                        </div>
                        {/* <div className='relative flex flex_col items-center'>
                        </div> */
                        }
                    </div>

                </div>
            </li>
        )
    };
    // 중분류 카테고리 버튼 컴포넌트
    const SubCategoryButton = (props) => {
        if (props.mainCate === "all") {} else {
            return (
                <ul className='mb-0'>
                    <li
                        className={subCategory == ''
                            ? 'cat_start pointer mr-1r subcategory_clicked'
                            : 'cat_start pointer mr-1r'}>
                        <div
                            onClick={() => {
                                setsubCategory("");
                                setFilterRating(0);
                                setFilterReview(0);
                            }}
                            className='subcategory_text'>
                            전체
                        </div>
                    </li>
                    {
                        subCategoryList.map((sub, idx) => {
                            return (
                                <li
                                    key={idx}
                                    className={subCategory == sub
                                        ? 'cat_start pointer mr-1r subcategory_clicked'
                                        : 'cat_start pointer mr-1r'}>
                                    <div
                                        onClick={() => {
                                            setsubCategory(sub);
                                            setFilterRating(0);
                                            setFilterReview(0);
                                        }}
                                        className='subcategory_text'>
                                        {sub}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            );
        }
    };
    // 필터링 버튼 컴포넌트
    const FilterButton = (props) => {
        console.log(props)
        return (
            <div
                className='h_row_center2 pointer sort_box mr-1r'
                style={props.targetState != 0
                    ? {
                        'background': 'rgba(255, 197, 124, 0.62)'
                    }
                    : {}}>
                <div
                    onClick={() => {
                        if (props.name == 'filterRating') {
                            setFilterReview(0);
                        } else {
                            setFilterRating(0);
                        }
                        if (props.targetState === 1) {
                            props.targetSetState(2); // 2: 낮은 순
                        } else if (props.targetState === 2) {
                            props.targetSetState(1); // 1: 높은 순
                        } else { // 0일 때 (초기 상태)
                            props.targetSetState(1); // 1: 높은 순
                        }
                    }}
                    className='flex'>
                    <div className=''>{props.how}</div>
                    <img src={props.src} alt='arrow_pic' className='arrowSize sort-img'/>
                </div>
            </div>
        )
    };
    // 현재 페이지에 대해 20개(limit으로 지정) 만큼의 장소를 보여줌
    const RecommendRow = () => {
        let rows = [] // 현재 페이지의 장소들의 인덱스를 담아준다.
        let i = (currentPage - 1) * limit;
        let rowss = []
        while (i < currentPage * limit) {
            var temp = [];
            for (var j = 0; j <= 3; j++) {
                temp.push(i + j);
                rowss.push(i + j);
            }
            rows.push(temp);
            i = i + 4;
        }
        console.log(rowss);
        return (
            <div className='flex flex-wrap'>
                {
                    rowss.map((r, idx1) => {
                        if (r < totalCount) {
                            return (
                                <RecommendBox
                                key={idx1}
                                photo={recommendPlaces.photo[r]}
                                search_category={recommendPlaces.search_category[r]}
                                name={recommendPlaces.name[r]}
                                rating={recommendPlaces.rating[r]}
                                address={recommendPlaces.address[r]}
                                keywords={recommendPlaces.review_keywords[r]}
                                place_code={recommendPlaces.place_code[r]}
                                className={'class-' + idx1 + ' pointer'}/>
                            );
                        } else {
                            
                        }
                    })
                }
                {/* {
                    rows.map((row, idx1) => {
                        return (
                            <div key={idx1} className='margin_box mb-130'>
                                <div className='h_row'>
                                    {
                                        row.map((r, idx2) => {
                                            if (r < totalCount) {
                                                return (
                                                    <RecommendBox
                                                        key={idx2}
                                                        photo={recommendPlaces.photo[r]}
                                                        search_category={recommendPlaces.search_category[r]}
                                                        name={recommendPlaces.name[r]}
                                                        rating={recommendPlaces.rating[r]}
                                                        address={recommendPlaces.address[r]}
                                                        keywords={recommendPlaces.review_keywords[r]}
                                                        place_code={recommendPlaces.place_code[r]}/>
                                                );
                                            } else {
                                                return (<div>더 이상 결과가 없습니다.</div>);
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                } */
                }
            </div>
        )
    };
    console.log(recommendPlaces);
    // 추천 장소 박스 컴포넌트
    const RecommendBox = (props) => {
        const navigate = useNavigate();
        var subCategory = "";
        var keywords = props.keywords;
        var keywords_list;
        var is_keywords = true;
        switch (props.search_category) {
            case "한식":
            case "양식":
            case "중식":
            case "일식":
            case "패스트푸드":
            case "분식":
                subCategory = "먹기";
                break;
            case "카페":
            case "디저트카페":
            case "베이커리":
                subCategory = "마시기";
                break;
            case "전시관":
            case "공방":
            case "팝업스토어":
            case "극장":
            case "서점":
            case "복합쇼핑몰":
                subCategory = "놀기";
                break;
            case "공원":
            case "시장":
            case "거리":
                subCategory = "걷기";
                break;
        }
        if (keywords != "no result") { // 리뷰 요약 키워드가 있으면
            // [ ] ' 제거해주고 공백 기준으로 문자열 스플릿
            keywords = keywords.replace('[', '');
            keywords = keywords.replace(']', '');
            keywords = keywords.replace(/\'/g, '');
            keywords_list = keywords.split(' ', 3);
        } else { // 리뷰 요약 키워드가 없으면
            is_keywords = false;
        }

        const KeywordBox = (props) => {
            if (props.is_keywords === false) { // 리뷰 요약 키워드가 없으면
                return (
                    <div
                        className='flex-row'
                        style={{
                            display: "flex"
                        }}>
                        <div className='mr-1r'>
                            <h6 className='keyword-font'>리뷰가 없습니다</h6>
                        </div>
                    </div>

                )
            } else { // 리뷰 요약 키워드가 있으면
                return (
                    <div className='flex-row'>
                        {
                            keywords_list.map((kwd, idx) => {
                                return (
                                    <div key={idx} className='mr-1r'>
                                        <h6 key={idx} className='keyword-font' style={{'color':'rgb(230 157 65)'}}># {kwd}</h6>
                                    </div>
                                );
                            })
                        }
                    </div>
                )
            }
        }

        // 상세페이지 새 탭에서 열리도록 해줌
        const handleOpenNewTab = (url) => {
            // 부모 탭과 sesssionStorage에 있는 로그인 정보를 공유하려면 window.name이 같아야 해서 설정
            window.name = "Tab"
            window.open(url, `_blank ${window.name}`);
        };

        return (
            // <div className='single_box'
            // onClick={()=>{navigate(`/detailpage/${props.place_code}`,{state:{place_code:props.place_code}});}}>
            <div
                className={props.className}
                onClick={() => handleOpenNewTab(`/detailpage/${props.place_code}`)}>
                <img className='placeImg' src={props.photo} alt="profile"/>
                <div>
                    <div>
                        <div className="fw-bold h-row-center justify-content-between place-category">
                            <div>{subCategory} / {props.search_category}</div>
                            <div class="hot-rating">
                                <img src = {require("../img/star.png")} className="hot-rating-img"/>
                                <span className='mr-05r'>{props.rating}</span>
                            </div>
                        </div>
                        <div className="flex place-name items-center">
                            <img className="place-img" src ={require("../img/fitplace_logo.png")} />
                            <span className='place-text'>{props.name}</span>
                        </div>
                        <h6 className='place_address'>{props.address}</h6>
                    </div>
                    <hr className='width-100 m-tb'/>
                    <div className=''>
                        <KeywordBox is_keywords={is_keywords}/>
                    </div>
                </div>

            </div>
        )
    }
    // 페이지네이션
    const Pagenation = () => {
        return (
            <div className='text-center m-tb80'>
                <button className='btn btn-default' onClick={() => setCurrentPage(1)}>&#60;&#60;</button>
                <button className='btn btn-default' onClick={() => setCurrentPage(prev)}>&#60;</button>
                {
                    pageGroupList.map((page, idx) => {
                        if (page === currentPage) {
                            return (
                                <button
                                    className='btn btn-default activeBtn'
                                    onClick={() => {setCurrentPage(page);window.scrollTo(0,0);}}
                                    key={idx}>{page}</button>
                            );
                        } else {
                            return (
                                <button
                                    className='btn btn-default'
                                    onClick={() => {setCurrentPage(page);window.scrollTo(0,0);}}
                                    key={idx}>{page}</button>
                            );
                        }
                    })
                }
                <button className='btn btn-default' onClick={() => setCurrentPage(next)}>&#62;</button>
                <button className='btn btn-default' onClick={() => setCurrentPage(totalPage)}>&#62;&#62;</button>
            </div>
        )
    }

    // -------------------------[ 함수 ]------------------------- 사용자 프로필 정보 불러오는 함수
    const getProfile = async () => {
        const response = await axios.get("http://localhost:8000/users/profile/", {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        console.log("[Search.js] ==> Loading profile...", response);
        setNickname(response.data.nickname);

        setEffectFlag(response.data.nickname);
        // 연령대 설정
        switch (response.data.age) {
            case "age_10":
                setAge10(1);
                setAge("10대");
                console.log("AGE 10 SET");
                break;
            case "age_20":
                setAge20(1);
                setAge("20대");
                console.log("AGE 20 SET");
                break;
            case "age_30":
                setAge30(1);
                setAge("30대");
                console.log("AGE 30 SET");
                break;
            case "age_40":
                setAge40(1);
                setAge("40대");
                console.log("AGE 40 SET");
                break;
            case "age_50":
                setAge50(1);
                setAge("50대");
                console.log("AGE 50 SET");
                break;
            case "age_60":
                setAge60(1);
                setAge("60대");
                console.log("AGE 60 SET");
                break;
            default:
                break;
        }
        // 성별 설정
        switch (response.data.gender) {
            case 'gender_male':
                setMale(1);
                setGender("남성");
                console.log("GENDER MALE SET");
                break;
            case 'gender_female':
                setFemale(1);
                setGender("여성");
                console.log("GENDER FEMALE SET");
                break;
            default:
                break;
        }
        // MBTI 설정
        switch (response.data.mbti) {
                // IS__
            case 'mbti_istj':
                setMbti("ISTJ");
                setMbtiIS(1);
                console.log("MBTI IS__ SET");
                break;
            case 'mbti_istp':
                setMbti("ISTP");
                setMbtiIS(1);
                console.log("MBTI IS__ SET");
                break;
            case 'mbti_isfj':
                setMbti("ISFJ");
                setMbtiIS(1);
                console.log("MBTI IS__ SET");
                break;
            case 'mbti_isfp':
                setMbti("ISFP");
                setMbtiIS(1);
                console.log("MBTI IS__ SET");
                break;
                // IN__
            case 'mbti_intj':
                setMbti("INTJ");
                setMbtiIN(1);
                console.log("MBTI IN__ SET");
                break;
            case 'mbti_intp':
                setMbti("INTP");
                setMbtiIN(1);
                console.log("MBTI IN__ SET");
                break;
            case 'mbti_infj':
                setMbti("INFJ");
                setMbtiIN(1);
                console.log("MBTI IN__ SET");
                break;
            case 'mbti_infp':
                setMbti("INFP");
                setMbtiIN(1);
                console.log("MBTI IN__ SET");
                break;
                // ES__
            case 'mbti_estj':
                setMbti("ESTJ");
                setMbtiES(1);
                console.log("MBTI ES__ SET");
                break;
            case 'mbti_estp':
                setMbti("ESTP");
                setMbtiES(1);
                console.log("MBTI ES__ SET");
                break;
            case 'mbti_esfj':
                setMbti("ESFJ");
                setMbtiES(1);
                console.log("MBTI ES__ SET");
                break;
            case 'mbti_esfp':
                setMbti("ESFP");
                setMbtiES(1);
                console.log("MBTI ES__ SET");
                break;
                // EN__
            case 'mbti_entj':
                setMbti("ENTJ");
                setMbtiEN(1);
                console.log("MBTI EN__ SET");
                break;
            case 'mbti_entp':
                setMbti("ENTP");
                setMbtiEN(1);
                console.log("MBTI EN__ SET");
                break;
            case 'mbti_enfj':
                setMbti("ENFJ");
                setMbtiEN(1);
                console.log("MBTI EN__ SET");
                break;
            case 'mbti_enfp':
                setMbti("ENFP");
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
            "userform": {
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
            "sub_category": subCategory,
            "filter_rating": filterRating,
            "filter_review": filterReview,

            "effect_flag": effectFlag
        }
        //console.log(body);
        console.log("[Search.js] ==> Recommended places loading...", body);
        const response = await axios.post(
            `http://localhost:8000/recommendations/`,
            body,
            {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }
        )
        setRecommendPlaces(response.data);

        // 초기 페이지네이션 세팅 (장소 불러오면서 1페이지로)
        setTotalCount(response.data.name.length); // 총 데이터 개수 계산
        setTotalPage(Math.ceil(response.data.name.length / limit)); // 총 페이지 개수 계산 (마지막 페이지 올림 처리)

        setCurrentPage(1);
    };
    // 페이지네이션 갱신 함수
    const updatePage1 = () => {
        var current_page = currentPage;
        var page_group = pageGroup;
        var last_number = lastNumber;
        var first_number = firstNumber;
        var prev_tmp = prev;
        var next_tmp = next;
        var temp = [];

        // 현재 페이지 그룹 계산
        page_group = Math.ceil(current_page / pageCount);

        // 현재 페이지 그룹 첫번째,마지막 숫자 계산
        last_number = page_group * pageCount;
        if (last_number > totalPage) {
            last_number = totalPage;
        }
        first_number = pageCount * (page_group - 1) + 1;

        // <<< >>> 버튼 값(prev, next) 계산
        if (first_number === 1) {
            prev_tmp = 1;
        } else {
            prev_tmp = first_number - 1;
        }
        if (last_number === totalPage) {
            next_tmp = totalPage;
        } else {
            next_tmp = last_number + 1;
        }

        for (var i = first_number; i <= last_number; i++) {
            temp.push(i);
        }

        // 변경된 값들에 대한 state 갱신
        setPageInfo({
            "current_page": current_page,
            "page_group": page_group,
            "last_number": last_number,
            "first_number": first_number,
            "prev_tmp": prev_tmp,
            "next_tmp": next_tmp,
            "page_group_list": temp
        })
    };
    // 페이지네이션 정보 state들 변경된 내용으로 갱신해주는 함수
    const updatePage2 = () => {
        setPageGroup(pageInfo.page_group);
        setLastNumber(pageInfo.last_number);
        setFirstNumber(pageInfo.first_number);
        setPrev(pageInfo.prev_tmp);
        setNext(pageInfo.next_tmp);
        setPageGroupList(pageInfo.page_group_list);
    };
    // 중분류 카데고리 버튼 갱신 함수
    const updateCategoryBar = () => {
        var sub1 = [
            "한식",
            "양식",
            "중식",
            "일식",
            "패스트푸드",
            "분식"
        ];
        var sub2 = ["카페", "디저트카페", "베이커리"];
        var sub3 = [
            "전시관",
            "공방",
            "팝업스토어",
            "극장",
            "서점",
            "복합쇼핑몰"
        ];
        var sub4 = ["공원", "시장", "거리"];
        switch (mainCategory) {
            case "restaurant":
                setSubCategoryList(sub1);
                break;
            case "cafe":
                setSubCategoryList(sub2);
                break;
            case "leisure":
                setSubCategoryList(sub3);
                break;
            case "walking":
                setSubCategoryList(sub4);
                break;
        }
        console.log(subCategory);
    };

    // ---------------------------[ useEffect 함수 ]---------------------------
    useEffect(() => {
        getProfile();
    }, []);
    // 처음에 사용자 정보 불러올 때 닉네임 정보로 세팅해주고, 이 값이 변할때만 useEffect 실행
    useEffect(() => {
        getRecommend();
    }, [
        effectFlag,
        mainCategory,
        subCategory,
        filterRating,
        filterReview,
        filterRegion
    ])

    useEffect(() => {
        updatePage1(); // 현재 페이지가 변경되면 페이지네이션 정보 수정
    }, [recommendPlaces, currentPage])
    useEffect(() => {
        updatePage2(); // pageInfo가 변경되면 (페이지네이션 정보가 모두 수정되면) 페이지네이션 state값들 모두 갱신해줌
    }, [pageInfo])
    useEffect(() => {
        updateCategoryBar(); // 대분류, 중분류 카테고리 값 변경 시 실행
    }, [mainCategory, subCategory])

    // ---------------------------[ 메인(Search) 컴포넌트 리턴 ]---------------------------
    console.log('세션스토리지', sessionStorage.getItem("username") === null);
    console.log(filterRating, filterReview);
    if (sessionStorage.getItem("username") === null) {
        alert('로그인 후 이용 부탁드립니다.');
        window.location.href = '/'
    } else {
        if (recommendPlaces === 0) {
            return (
                <div className='waiting'>
                    <div class="loader"><img className='waitingImg' src={require('../img/fitplace_logo.png')}/></div>
                    <span className='waitingText'>추천 장소를 불러오는 중입니다</span>
                </div>
            )
        } else {
            return (
                <Layout>
                    <div className='container_style bd-1'>
                        <Container>
                            <div className='h_column_center2'>
                                <div className='h_row_center2 mt-1r'>
                                    <div className='category category_size'>
                                        <ul className='h-44 mb-0'>
                                            <CategoryButton className={mainCategory == 'all'
                                                    ? "cat_start pointer mr-2r clicked"
                                                    : "cat_start mr-2r pointer"} label="전체" clicked={setMainCategory} value="all"
                                                // src={require('../img/all.png')}
                                                src={mainCategory == 'all'
                                                    ? require('../img/all2.png')
                                                    : require('../img/all.png')} alt="eat_cat"/>
                                            <CategoryButton
                                                className={mainCategory == 'restaurant'
                                                    ? "cat_other pointer mr-2r clicked"
                                                    : "cat_other mr-2r pointer"}
                                                label="먹기"
                                                clicked={setMainCategory}
                                                value="restaurant"
                                                src={mainCategory == 'restaurant'
                                                    ? require('../img/eat2.png')
                                                    : require('../img/eat.png')}
                                                alt="eat_cat"/>
                                            <CategoryButton
                                                className={mainCategory == 'cafe'
                                                    ? "cat_other pointer mr-2r clicked"
                                                    : "cat_other mr-2r pointer"}
                                                label="마시기"
                                                clicked={setMainCategory}
                                                value="cafe"
                                                src={mainCategory == 'cafe'
                                                    ? require('../img/drink2.png')
                                                    : require('../img/drink.png')}
                                                alt="eat_cat"/>
                                            <CategoryButton
                                                className={mainCategory == 'leisure'
                                                    ? "cat_other pointer mr-2r clicked"
                                                    : "cat_other mr-2r pointer"}
                                                label="놀기"
                                                clicked={setMainCategory}
                                                value="leisure"
                                                src={mainCategory == 'leisure'
                                                    ? require('../img/game2.png')
                                                    : require('../img/game.png')}
                                                alt="eat_cat"/>
                                            <CategoryButton
                                                className={mainCategory == 'walking'
                                                    ? "cat_other pointer mr-2r clicked"
                                                    : "cat_other mr-2r pointer"}
                                                label="걷기"
                                                clicked={setMainCategory}
                                                value="walking"
                                                src={mainCategory == 'walking'
                                                    ? require('../img/sneaker2.png')
                                                    : require('../img/sneaker.png')}
                                                alt="eat_cat"/>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div
                        className="container_style pd-top0 bd-1"
                        style={mainCategory == 'all'
                            ? {
                                'display': 'none'
                            }
                            : {
                                'display': 'block'
                            }}>
                        <Container>
                            <div className='h_column_center2'>
                                <div
                                    className='h_row_center2 height58'
                                    style={{
                                        "margin-left" : "-3px"
                                    }}>
                                    <div className='category category_size'>
                                        <SubCategoryButton mainCate={mainCategory}></SubCategoryButton>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className='container_style pd-top0 mt-30'>
                        <Container>
                            <div className='d-flex justify-content'>
                                <div className='flex'>
                                    <div className='flex'>
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant="success"
                                                id="dropdown-basic"
                                                className='bg-white btn-outline-secondary sort_box mr-1r
                                                '>
                                                지역 선택 ( 현재 : {filterRegion}
                                                )
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        setFilterRegion("강남구");
                                                        setMainCategory("all");
                                                        setsubCategory("");
                                                        setFilterRating(0);
                                                        setFilterReview(0);
                                                    }}>강남구</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        setFilterRegion("구로구");
                                                        setMainCategory("all");
                                                        setsubCategory("");
                                                        setFilterRating(0);
                                                        setFilterReview(0);
                                                    }}>구로구</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        setFilterRegion("마포구");
                                                        setMainCategory("all");
                                                        setsubCategory("");
                                                        setFilterRating(0);
                                                        setFilterReview(0);
                                                    }}>마포구</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        setFilterRegion("용산구");
                                                        setMainCategory("all");
                                                        setsubCategory("");
                                                        setFilterRating(0);
                                                        setFilterReview(0);
                                                    }}>용산구</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        setFilterRegion("종로구");
                                                        setMainCategory("all");
                                                        setsubCategory("");
                                                        setFilterRating(0);
                                                        setFilterReview(0);
                                                    }}>종로구</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className='flex'>
                                        <div
                                            className='h_row_center2 pointer sort_box mr-1r'
                                            onClick={() => {
                                                setFilterRating(0);
                                                setFilterReview(0);
                                            }}
                                            style={filterRating == 0 && filterReview == 0
                                                ? {
                                                    "background": "#ffc57c9e"
                                                }
                                                : {}}>추천순</div>
                                        <FilterButton
                                            how="평점순"
                                            name='filterRating'
                                            targetState={filterRating}
                                            targetSetState={setFilterRating}
                                            src={filterRating == 2
                                                ? require('../img/down-arrow.png')
                                                : require('../img/up-arrow.png')}/>
                                        <FilterButton
                                            how="리뷰순"
                                            name='filterReview'
                                            targetState={filterReview}
                                            targetSetState={setFilterReview}
                                            src={filterReview == 2
                                                ? require('../img/down-arrow.png')
                                                : require('../img/up-arrow.png')}/>
                                    </div>
                                </div>
                                <div
                                    className='profile_info flex'
                                    style={age == '' && gender == '' && mbti == ''
                                        ? {
                                            "display": "none"
                                        }
                                        : {
                                            "display": "flex"
                                        }}>
                                    <div
                                        className=''
                                        style={{
                                            "padding" : "7px 9px"
                                        }}>{nickname}
                                        프로필<img src={require('../img/user.png')} className='profileUserImg ml-3p'/>
                                        :</div>
                                    <div
                                        className='sort_box profile_box ml-05r'
                                        style={age == ''
                                            ? {
                                                "display": "none"
                                            }
                                            : {
                                                "display": "block"
                                            }}>{age}</div>
                                    <div
                                        className='sort_box profile_box ml-05r'
                                        style={gender == ''
                                            ? {
                                                "display": "none"
                                            }
                                            : {
                                                "display": "block"
                                            }}>{gender}</div>
                                    <div
                                        className='sort_box profile_box ml-05r'
                                        style={mbti == ''
                                            ? {
                                                "display": "none"
                                            }
                                            : {
                                                "display": "block"
                                            }}>{mbti}</div>
                                </div>
                            </div>
                        </Container>

                    </div>
                    <div>
                        <Container
                            className='container_style pd-top0'
                            style={{
                                minHeight: "75vh"
                            }}>
                            <div className='mt-50'>
                                <RecommendRow/>
                                <Pagenation></Pagenation>
                            </div>

                        </Container>
                    </div>

                </Layout>
            )
        }
    }

}

export default Search