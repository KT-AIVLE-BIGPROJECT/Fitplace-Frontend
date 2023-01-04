import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';
// import dotenv from "dotenv";

import Layout from '../layouts/Layout'
import '../css/main.css'
import './DetailPage.css'

import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import {useLocation} from 'react-router-dom';
import {Container} from 'react-bootstrap';

const DetailBody = () => {
    const location = useLocation();
    const getPath = location
        .pathname
        .split('/')
    // 장소 데이터
    const [placeCode, setPlaceCode] = useState(getPath[getPath.length - 1]); // URL에서 장소코드 받아옴
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);
    const [visitorCnt, setVisitorCnt] = useState(0);
    const [blogCnt, setBlogCnt] = useState(0);
    const [keywords, setKeywords] = useState("");
    const [tel, setTel] = useState("");
    const [address, setAddress] = useState("");
    const [detailURL, setDetailURL] = useState(""); // 네이버 지도 상세페이지 URL
    // 요약 리뷰 데이터
    const [reviewSum1, setReviewSum1] = useState("")
    const [reviewSumCnt1, setReviewSumCnt1] = useState("")
    const [reviewSum2, setReviewSum2] = useState("")
    const [reviewSumCnt2, setReviewSumCnt2] = useState("")
    const [reviewSum3, setReviewSum3] = useState("")
    const [reviewSumCnt3, setReviewSumCnt3] = useState("")
    // 방문자 리뷰 데이터
    const [review1, setReview1] = useState("");
    const [review2, setReview2] = useState("");
    const [review3, setReview3] = useState("");
    const [review4, setReview4] = useState("");
    const [review5, setReview5] = useState("");
    const [review6, setReview6] = useState("");
    const [review7, setReview7] = useState("");
    const [review8, setReview8] = useState("");
    const [review9, setReview9] = useState("");
    const [review10, setReview10] = useState("");
    // 네이버 블로그 리뷰 데이터
    const [blogReview, setBlogReview] = useState({});
    const [blogReviewCnt, setBlogReviewCnt] = useState(0);
    const [loopIdx, setLoopIdx] = useState([0]);

    // 혼잡도 관련
    const [nearestHot, setNearestHot] = useState("");
    //const [congestLvl, setConjestLvl] = useState("");
    const [congestIcon, setConjestIcon] = useState("");
    const [congestMessage, setCongestMessage] = useState("혼잡도 파악 중...");
    const [ppltnMin, setPpltnMin] = useState(0); // 실시간 인구지표 최소값

    // const [test, setTest] = useState("TEST"); 혼잡도 과거 데이터,
    const [before, setBefore] = useState({
        'H-23': 0,
        'H-22': 0,
        'H-21': 0,
        'H-20': 0,
        'H-19': 0,
        'H-18': 0,
        'H-17': 0,
        'H-16': 0,
        'H-15': 0,
        'H-14': 0,
        'H-13': 0,
        'H-12': 0,
        'H-11': 0,
        'H-10': 0,
        'H-9': 0,
        'H-8': 0,
        'H-7': 0,
        'H-6': 0,
        'H-5': 0,
        'H-4': 0,
        'H-3': 0,
        'H-2': 0,
        'H-1': 0,
        'H-0': ppltnMin
    });
    // 혼잡도 예측 결과
    const [predict, setPredict] = useState({"H-0": 0, "H+1": 0, "H+2": 0});
    // 혼잡도 예측 메시지
    const [message_h01, setMessage_h01] = useState("");
    const [message_h02, setMessage_h02] = useState("");
    const [gu, setGu] = useState("강남구");

    // ---------------------------- [ 컴포넌트 ] ---------------------------- 장소 요약 키워드
    // 장소 요약 키워드 태그 컴포넌트
    const ShowTags = (props) => {
        var keywords2 = props.keywords;
        var is_keywords = true;
        var keywords_list;
        // console.log(keywords2)

        if (keywords2 != "no result") {
            keywords2 = keywords2.replace('[', '');
            keywords2 = keywords2.replace(']', '');
            keywords2 = keywords2.replace(/\'/g, '');
            keywords2 = keywords2.replace(/\'/g, '');
            keywords_list = keywords2.split(' ', 3);
        } else {
            is_keywords = false;
        }

        if (is_keywords === false) {

        } else {
            return (
                <div>
                    {
                        keywords_list.map((kwd, idx) => {
                            return (
                                <span className='test mr-05r' style={{"color": "rgb(230, 157, 65)}"}} key={idx}>#{kwd}
                                </span>
                            )
                        })
                    }
                </div>
            )
        }
    };
    // 키워드 리뷰 컴포넌트
    function ShowReviewSummary() {
        if (reviewSumCnt1 != 0) {
            var maximumCnt = Math.max(reviewSumCnt1, reviewSumCnt2, reviewSumCnt3);
            var reviews = [
                {
                    "text": reviewSum1,
                    "cnt": reviewSumCnt1,
                    "percent": reviewSumCnt1 / maximumCnt * 87
                }, {
                    "text": reviewSum2,
                    "cnt": reviewSumCnt2,
                    "percent": reviewSumCnt2 / maximumCnt * 87
                }, {
                    "text": reviewSum3,
                    "cnt": reviewSumCnt3,
                    "percent": reviewSumCnt3 / maximumCnt * 87
                }
            ];

            return (
                <ul>
                    {
                        reviews.map((review, idx) => {
                            return (
                                <li key={idx} class="bar_background">
                                    <div
                                        class="bar"
                                        style={{
                                            width: review['percent'] + "%"
                                        }}></div>
                                    <div class="bar_contents">
                                        <span class="review_summary">{review['text']}</span>
                                        <span class="review_summary_cnt">{review['cnt']}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
    };
    // 혼잡도 그래프 컴포넌트
    function ShowCongestion() {
        const data = {
            datasets: [
                {
                    type: 'line',
                    label: '지난 24시간의 인구수',
                    backgroundColor: "rgba(255,0,0,1)",
                    data: before,
                    borderColor: 'red'
                }, {
                    type: 'line',
                    label: "예측된 인구수",
                    data: predict,
                    backgroundColor: "rgba(0,0,255,1)",
                    borderColor: 'blue'
                }
            ]
        }
        return (<div>
            <Line type="line" data={data}/>
        </div>);
    };
    // 방문자 리뷰 컴포넌트
    function ShowVisitorReview() {
        var visitors = [
            review1,
            review2,
            review3,
            review4,
            review5,
            review6,
            review7,
            review8,
            review9,
            review10
        ];
        return (
            <ul className='list-group'>
                {
                    visitors.map((visitor, idx) => {
                        if (visitor != "") {
                            return (
                                <li key={idx} className="list-group-item">
                                    <div>{idx + 1}.</div>
                                    <span>{visitor}</span>
                                </li>
                            )
                        } else if (idx == 0 & visitor == "") {
                            return (
                                <li key={idx} className="list-group-item">
                                    <span>"이 장소에 대한 방문자 리뷰가 없어요..."</span>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        )
    };
    // 블로그 리뷰 컴포넌트
    function ShowBlogReview() {
        // 블로그 리뷰 새 탭에서 열기
        const handleOpenNewTab = (url) => {
            window.open(url);
        };

        if ((loopIdx != [0]) && (blogReviewCnt != 0)) {
            return (
                <ul className="list-group">
                    {
                        loopIdx.map((i, idx) => {
                            return (
                                <div className='blog-review-box' key={idx}>
                                    <div className='blog-image'>
                                        <img src={blogReview.photo_url[i]} alt="블로그 썸네일"></img>
                                    </div>
                                    <div className='blog-body'>
                                        <div className='blog-title'>
                                            <a
                                                onClick={() => {
                                                    handleOpenNewTab(blogReview.url[i])
                                                }}
                                                href="#">{blogReview.title[i]}</a>
                                        </div>
                                        <div className='blog-text'>{blogReview.body[i]}</div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </ul>
            )
        } else {
            return (
                <div>
                    <div class="loader"><img className='waitingImg' src={require('../img/fitplace_logo.png')}/></div>
                    <span
                        style={{
                            color: "#FFA432",
                            fontWeight: "bold",
                            fontSize: "x-large"
                        }}
                        className='waitingText'>네이버 블로그 리뷰를 불러오는 중입니다</span>
                </div>
            )
        }
    };

    // ---------------------------- [ 함수 ] ---------------------------- 서울시 실시간 혼잡도
    // API 호출
    const getCongestion = () => {
        console.log("[ DetailBody.js ] calling congestion api...");
        // API KEY는 .env 파일에
        const KEY = process.env.REACT_APP_CONGESTION_API_KEY;

        axios
            .get(
                `http://openapi.seoul.go.kr:8088/${KEY}/XML/citydata/1/5/${nearestHot}`
            )
            .then((response) => {
                let xml = new DOMParser().parseFromString(response.data, "text/xml");
                setCongestMessage(
                    xml.getElementsByTagName("AREA_CONGEST_LVL")[0].childNodes[0].nodeValue
                );
                setPpltnMin(
                    xml.getElementsByTagName("AREA_PPLTN_MIN")[0].childNodes[0].nodeValue
                );
                // console.log(xml.getElementsByTagName("AREA_CONGEST_LVL")[0].childNodes[0].n
                // odeValue); console.log(congestMessage);
            })
        switch (congestMessage) {
            case "여유":
                setConjestIcon('😀');
                break;
            case "보통":
                setConjestIcon('🙂');
                break;
            case "붐빔":
            case "약간 붐빔":
                setConjestIcon('😫');
                break;
            case "매우 붐빔":
                setConjestIcon("😡");
                break;
            default:
                break;
        }

    };
    // 네이버 블로그 리뷰 API 호출 함수
    const getBlogReviews = async () => {
        console.log("[DetailBody.js] loading naver blog reviews...");
        var body = {
            "place_code": placeCode
        };

        const response = await axios.post(`http://localhost:8000/blogreviews/`, body);
        setBlogReview(response.data);
        setBlogReviewCnt(response.data.title.length);
        console.log(blogReview);
        console.log(blogReviewCnt);
    };
    const setBlogReviews = () => {
        console.log("[DetailBody.js] setting naver blog reviews...");
        var loop_idx = [];
        if (blogReviewCnt != 0) {
            for (var i = 0; i < blogReviewCnt; i++) {
                loop_idx.push(i);
            }
        } else {
            loop_idx = [0];
        }
        setLoopIdx(loop_idx);
        console.log(loopIdx);
    };
    // DB혼잡도 예측 호출 API
    const getAPIConjestion = () => {
        // console.log("지난24시간 데이터 받는중...")
        console.log("혼잡도 API...");
        console.log(nearestHot);
        console.log(gu);
        axios
            .get(`http://localhost:8000/conjest/?nearestHot=${nearestHot}&gu=${gu}`)
            .then((response) => {
                // console.log(response.data.last_24)
                setBefore({
                    "H-23": response
                        .data
                        .last_24[23],
                    "H-22": response
                        .data
                        .last_24[22],
                    "H-21": response
                        .data
                        .last_24[21],
                    "H-20": response
                        .data
                        .last_24[20],
                    "H-19": response
                        .data
                        .last_24[19],
                    "H-18": response
                        .data
                        .last_24[18],
                    "H-17": response
                        .data
                        .last_24[17],
                    "H-16": response
                        .data
                        .last_24[16],
                    "H-15": response
                        .data
                        .last_24[15],
                    "H-14": response
                        .data
                        .last_24[14],
                    "H-13": response
                        .data
                        .last_24[13],
                    "H-12": response
                        .data
                        .last_24[12],
                    "H-11": response
                        .data
                        .last_24[11],
                    "H-10": response
                        .data
                        .last_24[10],
                    "H-9": response
                        .data
                        .last_24[9],
                    "H-8": response
                        .data
                        .last_24[8],
                    "H-7": response
                        .data
                        .last_24[7],
                    "H-6": response
                        .data
                        .last_24[6],
                    "H-5": response
                        .data
                        .last_24[5],
                    "H-4": response
                        .data
                        .last_24[4],
                    "H-3": response
                        .data
                        .last_24[3],
                    "H-2": response
                        .data
                        .last_24[2],
                    "H-1": response
                        .data
                        .last_24[1],
                    "H-0": response
                        .data
                        .last_24[0]
                })
                setPredict({
                    "H-0": response
                        .data
                        .last_24[0],
                    "H+1": response.data.y_test_1hour,
                    "H+2": response.data.y_test_2hour
                })
                setMessage_h01(response.data.h_01);
                setMessage_h02(response.data.h_02);
            })
    }

    // ------------------------ [ useEffect ] ------------------------
    useEffect(() => {
        axios
            .get(`http://localhost:8000/places/?place_code=${placeCode}`)
            .then((response) => {
                setPhoto(response.data.results[0].photo);
                setName(response.data.results[0].name);
                setCategory(response.data.results[0].category);
                setRating(response.data.results[0].rating);
                setVisitorCnt(response.data.results[0].review_visitor_count);
                setBlogCnt(response.data.results[0].review_blog_count);
                setKeywords(response.data.results[0].review_keywords);
                setTel(response.data.results[0].tel);
                setAddress(response.data.results[0].address);
                setDetailURL(`https://pcmap.place.naver.com/restaurant/${placeCode}/review/`)
                setReviewSum1(response.data.results[0].review_summary1);
                setReviewSumCnt1(response.data.results[0].review_summary_cnt1);
                setReviewSum2(response.data.results[0].review_summary2);
                setReviewSumCnt2(response.data.results[0].review_summary_cnt2);
                setReviewSum3(response.data.results[0].review_summary3);
                setReviewSumCnt3(response.data.results[0].review_summary_cnt3);
                setNearestHot(response.data.results[0].nearest_hotplace);
                // console.log(response.data.results[0]);
                // console.log("AAAA",response.data.results[0].review_keywords)
                setReview1(response.data.results[0].review1);
                setReview2(response.data.results[0].review2);
                setReview3(response.data.results[0].review3);
                setReview4(response.data.results[0].review4);
                setReview5(response.data.results[0].review5);
                setReview6(response.data.results[0].review6);
                setReview7(response.data.results[0].review7);
                setReview8(response.data.results[0].review8);
                setReview9(response.data.results[0].review9);
                setReview10(response.data.results[0].review10);

                // 혼잡도 데이터 위해서 추가함
                setGu(response.data.results[0].search_region);
            });
    }, [])
    // 실시간 혼잡도 불러오기
    useEffect(() => {
        getCongestion();
    }, [name, congestMessage]);
    //  네이버 블로그 리뷰 불러오기
    useEffect(() => {
        getBlogReviews();
    }, [])
    useEffect(() => {
        setBlogReviews();
    }, [blogReviewCnt])
    useEffect(() => {
        getAPIConjestion();
    }, [nearestHot, gu])

    return (
        <div>
            <Container
                className='container_style detailPage'
                style={{
                    minHeight: "75wh"
                }}>
                <div className=''>
                    <div>
                        <div class='image_box'>
                            <img class='_storejpg' src={photo}></img>
                        </div>
                        <div className='text-center'>
                            <div class="m-0a title_box">
                                <div>
                                    <span class='_conjest'>
                                        <div>{congestMessage}
                                            {congestIcon}</div>
                                        {/* <div>혼잡 😫</div> */}
                                    </span>
                                </div>
                                <div>
                                    <span class="title mr-05r">{name}
                                    </span>
                                    <span class="category">{category}</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" class="_star">
                                    <path
                                        d="M8.26 4.68h4.26a.48.48 0 01.28.87L9.35 8.02l1.33 4.01a.48.48 0 01-.18.54.48.48 0 01-.56 0l-3.44-2.5-3.44 2.5a.48.48 0 01-.74-.54l1.33-4L.2 5.54a.48.48 0 01.28-.87h4.26l1.3-4a.48.48 0 01.92 0l1.3 4z"></path>
                                </svg>
                                <span className=''>{rating}</span>
                                <span className='mr-05r'>/5</span>
                                <a href="#방문자 리뷰" className='mr-05r'>
                                    <span class='_blue'>방문자리뷰
                                    </span>
                                    <span>{visitorCnt}
                                    </span>
                                </a>
                                <a href="#블로그 리뷰">
                                    <span class='_blue'>블로그리뷰
                                    </span>
                                    <span>{blogCnt}
                                    </span>
                                </a>
                                <br></br>
                                <ShowTags keywords={keywords}/>
                            </div>
                        </div>
                        <div class='main'>
                          <div className='main-topic'>상세정보</div>
                            <div class="left_margin_box">
                                <div>
                                    <span class='_blue'>전화번호
                                    </span>
                                    <span>{tel}</span>
                                </div>
                                <div>
                                    <span class='_blue'>주소
                                    </span>
                                    <span>{address}</span>
                                </div>
                                <div>
                                    <span class="_blue">네이버 지도에서 보기
                                    </span>
                                    <a href={detailURL} target="_blank" role="button" class="naver_map_link">
                                        {/* <i class="naver_logo"></i> */}
                                        네이버 지도
                                    </a>
                                </div>
                            </div>
                            <hr></hr>

                            <div class="place_section">
                                <div class="place_section_title">
                                    <span>"방문하신 분들이 뽑은 장점"</span>
                                </div>
                                <div class="place_section_content">
                                    <div class="bar_chart">
                                        <ul>
                                            <ShowReviewSummary></ShowReviewSummary>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    </div>

                    <div>
                        <div class="review_box">
                            <span className='review_title'>혼잡도 예측</span>
                            <div class="review_box">
                                <ul className='list-group'>
                                    <li className='list-group-item'>현재: {congestMessage}</li>
                                    {/* <li className='list-group-item'>현재 실시간 인구지표 최소값: ({ppltnMin})</li> */}
                                    <li className='list-group-item'>1시간 뒤에는: {message_h01}</li>
                                    <li className='list-group-item'>2시간 뒤에는: {message_h02}</li>
                                </ul>
                            </div>
                            <div className='review_content'>
                                <ShowCongestion></ShowCongestion>
                            </div>
                        </div>
                        <hr></hr>

                        <div class="review_box">
                            <a name="방문자 리뷰"></a>
                            <span className='review_title'>방문자 리뷰</span>
                            <div className='review_content'>
                                <ShowVisitorReview></ShowVisitorReview>
                            </div>
                        </div>
                        <hr></hr>

                        <div className='review_box'>
                            <a name="블로그 리뷰"></a>
                            <span className='review_title'>블로그 리뷰</span>
                            <div className='review_content'>
                                <ShowBlogReview></ShowBlogReview>
                                {/* <div>{blogReview.title[0]}</div>
                            <div>{blogReview.body[0]}</div>
                            <div>{blogReview.url[0]}</div> */
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>

    )
}

export default DetailBody