import React from 'react'
import '../css/main.css'

const SearchPlace = () => {
  return (
    <div>
        <div className='margin_box mb-130'>
                      
          <div className='flex h-60 right-sort mb-23'>
            <div className='h_row_center2'>
                <div className='flex mr-60 sort-box z-idx'>
                    <h6 className='sort-text'>평점순</h6>
                    <img src="https://s3.hourplace.co.kr/web/images/icon/sort.svg" alt='arrow_pic' className='arrow-size sort-img' />
                </div>
            </div>
            <div className='h_row_center2'>
                <div className='flex mr-60 sort-box z-idx'>
                    <h6 className='sort-text'>리뷰순</h6>
                    <img src="https://s3.hourplace.co.kr/web/images/icon/sort.svg" alt='arrow_pic' className='arrow-size sort-img' />
                </div>
            </div>
          </div>
        <div className='h_row'>
            
            <div className='single_box'>
                <img className='hotimg' src="https://mp-seoul-image-production-s3.mangoplate.com/528686_1634124503122115.jpg?fit=around|362:362&crop=362:362;*,*&output-format=jpg&output-quality=80" alt="profile" />
                <div className='namebox'>
                    <h6 className='area_cat'>마시기 / 카페</h6>
                    <div className='flex_row'>
                        <h6>마일스톤커피</h6>
                        <div className='flex'>
                            <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                            <h6 className='star_rank'>4.3</h6>
                        </div>
                    </div>
                    <h6 className='area_cat'>서울특별시 강남구 논현로159길 49</h6>
                    <div className='flex_row'>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#맛있다</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#좋다</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#케이크</h6>    
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className='single_box'>
                <img className='hotimg' src="https://mp-seoul-image-production-s3.mangoplate.com/26472_1664269622123832.jpg?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80" alt="profile" />
                <div className='namebox'>
                    <h6 className='area_cat'>먹기 / 양식</h6>
                    <div className='flex_row'>
                        <h6>rivna</h6>
                        <div className='flex'>
                            <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                            <h6 className='star_rank'>4.7</h6>
                        </div>
                    </div>
                    <h6 className='area_cat'>서울특별시 성동구 뚝섬로 366-46</h6>
                    <div className='flex_row'>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#맛있다</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#새우</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#볶음밥</h6>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className='single_box'>
                <img className='hotimg' src="https://ldb-phinf.pstatic.net/20211004_139/1633285638778OGTGy_JPEG/KakaoTalk_20210916_131400332.jpg" alt="profile" />
                <div className='namebox'>
                    <h6 className='area_cat'>놀기 / 공방</h6>
                    <div className='flex_row'>
                        <h6>뤼미에르퍼퓸 연남</h6>   
                        <div className='flex'>
                            <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                            <h6 className='star_rank'>4.96</h6>
                        </div> 
                    </div>
                    <h6 className='area_cat'>서울 마포구 동교로 227-11 3층</h6>
                    <div className='flex_row'>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#향수</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#분위기</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#재밌다</h6>    
                        </div>
                    </div>
                </div>
            </div>

            <div className='single_box'>
                <img className='hotimg' src="https://ldb-phinf.pstatic.net/20210825_48/1629868378223OLwXU_JPEG/qfi6_RSzsEF1uF2Xi593QpyU.jpg" alt="profile" />
                <div className='namebox'>
                    <h6 className='area_cat'>놀기 / 팝업스토어</h6>
                    <div className='flex_row'>
                        <h6>디즈니샵</h6>
                        <div className='flex'>
                            <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                            <h6 className='star_rank'>4.5</h6>
                        </div>
                    </div>
                    <h6 className='area_cat'>서울 용산구 한강대로23길 55 3층</h6>
                    <div className='flex_row'>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#예쁘다</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#디즈니</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#귀엽다</h6>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className='margin_box mb-130'>
        <div className='h_row'>
            
            <div className='single_box'>
                <img className='hotimg' src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220622_181%2F1655893228328oitIx_JPEG%2F836E6F26-AB6D-4CDB-AB4F-CE9E9F4E43AA.jpeg" alt="profile" />
                <div className='namebox'>
                    <h6 className='area_cat'>마시기 / 디저트</h6>
                    <div className='flex_row'>
                        <h6>오지힐</h6>
                        <div className='flex'>
                            <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                            <h6 className='star_rank'>4.3</h6>
                        </div>
                    </div>
                    <h6 className='area_cat'>서울 용산구 대사관로11길 9-9 1층</h6>
                    <div className='flex_row'>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#달다</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#좋다</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#케이크</h6>    
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className='single_box'>
                <img className='hotimg' src="https://mp-seoul-image-production-s3.mangoplate.com/1062976_1588491910418180.jpg?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80" alt="profile" />
                <div className='namebox'>
                    <h6 className='area_cat'>먹기 / 일식</h6>
                    <div className='flex_row'>
                        <h6>도토리브라더스</h6>
                        <div className='flex'>
                            <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                            <h6 className='star_rank'>4.7</h6>
                        </div>
                    </div>
                    <h6 className='area_cat'>서울특별시 종로구 경희궁길 41</h6>
                    <div className='flex_row'>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#깨끗하다</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#대창</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#맛있다</h6>    
                        </div>
                    </div>
                </div>
            </div>
        
            <div className='single_box'>
                <img className='hotimg' src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210913_148%2F1631499446491JYjeA_JPEG%2F5tqakm_eHBbaEiWarmMdCMbP.jpg" alt="profile" />
                <div className='namebox'>
                    <h6 className='area_cat'>놀기 / 쇼핑몰</h6>
                    <div className='flex_row'>
                        <h6>젠틀몬스터 플래그십스토어</h6>   
                        <div className='flex'>
                            <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                            <h6 className='star_rank'>4.62</h6>
                        </div> 
                    </div>
                    <h6 className='area_cat'>서울 마포구 독막로7길 54</h6>
                    <div className='flex_row'>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#분위기</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#좋다</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#선글라스</h6>    
                        </div>
                    </div>
                </div>
            </div>

            <div className='single_box'>
                <img className='hotimg' src="https://mp-seoul-image-production-s3.mangoplate.com/350788/1151727_1636461516700_33331?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80" alt="profile" />
                <div className='namebox'>
                    <h6 className='area_cat'>먹기 / 양식</h6>
                    <div className='flex_row'>
                        <h6>몽크스부처</h6>
                        <div className='flex'>
                            <img className='goldstar' src="https://s3.hourplace.co.kr/web/images/icon/gold_star.svg" alt="profile" />
                            <h6 className='star_rank'>4.85</h6>
                        </div>
                    </div>
                    <h6 className='area_cat'>서울특별시 용산구 이태원로 228-1</h6>
                    <div className='flex_row'>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#맛있다</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#좋다</h6>    
                        </div>
                        <div className='mr-15 keyword-box'>
                            <h6 className='keyword-font'>#파스타</h6>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    </div>
  )
} 

export default SearchPlace