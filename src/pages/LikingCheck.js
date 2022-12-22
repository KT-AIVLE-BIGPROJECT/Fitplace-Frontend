import React from 'react';
import '../css/main.css';


const LikingCheck = () => {
  return (
    <>
        <div className='h_column_center'>
            <h3>취향 설정</h3>
        </div>
        <div className='flex flex_col w mt-4 m-0a'>
            <div>
                <div className='mb'>
                    <h5 className='flex mb-23'>먹기</h5>
                    <div className='flex items-center w-auto'>
                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/rice.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>한식</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/pasta.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>양식</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/jjajang.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>중식</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/sushi.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>일식</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/tteok.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>분식</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/burger.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>패스트푸드</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <hr></hr>

                <div className='mb'>
                    <h5 className='flex mb-23'>마시기</h5>
                    <div className='flex items-center w-auto'>
                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/coffee.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>카페</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/cake.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>디저트</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/bread.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>베이커리</h6>
                            </div>
                        </div>        
                    </div>
                </div>
                <hr></hr>
                <div className='mb'>
                    <h5 className='flex mb-23'>놀기</h5>
                    <div className='flex items-center w-auto'>
                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/art.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>전시관</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/hammer.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>공방</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/store.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>팝업스토어</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/movie.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>영화관</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/book.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>서점</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/shopping.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>쇼핑몰</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className='mb'>
                    <h5 className='flex mb-23'>걷기</h5>
                    <div className='flex items-center w-auto'>
                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/park.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>공원</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/market.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>시장</h6>
                            </div>
                        </div>

                        <div className='items-center justify-center mr-35'>
                            <div className='relative rounded overflow-hidden w-60 h-60'>
                                <img src={require('../img/walk.png')} alt='rice_pic' className='align-top' />
                            </div>
                            <div className='relative flex flex_col items-center'>
                                <h6>거리</h6>
                            </div>
                        </div>        
                    </div>
                </div>
                <hr></hr>

        <div className='mb-23 m-0a m-tb d-table'>
            <button type="button" className='btn btn-warning btn_view'>취향 설정 완료</button>
        </div>    
                

            </div>
            
        </div>
    </>
  )
}

export default LikingCheck