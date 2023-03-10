import React,{useState} from "react";

import { Swiper, SwiperSlide } from "swiper/react" // basic
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

SwiperCore.use([Navigation, Pagination, Autoplay]) // Swiper



const Places100List = ({places}) =>{
    console.log(places)
    const [AlphaNum, setAlphaNum] = useState("");
    
    const IsAlphaNume=(e)=>{
        const curValue=e.currentTarget.value;
        const notNum=/[^a-z0-9]/gi;

        setAlphaNum(curValue.replace(notNum,''))
    }
    // 상세페이지 새 탭에서 열리도록 해줌
    const handleOpenNewTab = (url) => {
        // 부모 탭과 sesssionStorage에 있는 로그인 정보를 공유하려면 window.name이 같아야 해서 설정
        window.name = "Tab"
        window.open(url, `_blank ${window.name}`);
    };
    return (
        <Swiper
            spaceBetween={10}
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
                720: {
                    slidesPerView: 1.5,
                    spaceBetween: 10
                  },
                  1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 20
                  },
                  1400: {
                    slidesPerView: 4.5,
                    spaceBetween: 30
                  }
            }}
        >
            {places.map(place => {
                return (
                <SwiperSlide key = {place.id}>
                    <div className="swiper-box" onClick={() => handleOpenNewTab(`/detailpage/${place.place_code}`)}>
                        <div className="hot-items">
                            <img src={place.photo} />
                        </div>
                        <div className="hot-detail">
                            <div className="fw-bold h-row-center hot-category">
                                <div>{place.category}</div>
                                <div class="hot-rating">
                                    <img src = {require("../img/star.png")} className="hot-rating-img"/>
                                    {place.rating}
                                </div>
                            </div>
                            <div className="hot-name"><img className="location-img" src ={require("../img/fitplace_logo.png")} />{place.name}</div>
                            <div className="h-row-center margin-top fw-light ">
                                <div className="margin-right">
                                    네이버리뷰 <span className="fw-bold">{place.review_visitor_count}</span>
                                </div>
                                <div className="margin-right">
                                    블로그 리뷰 <span className="fw-bold" value={place.review_blog_count} onChange={IsAlphaNume}>{place.review_blog_count}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                )
            })}
        </Swiper>
    );
};

export default Places100List;