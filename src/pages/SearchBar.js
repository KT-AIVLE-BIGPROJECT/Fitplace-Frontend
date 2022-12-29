import React from 'react'
import './SearchBar.css'
import '../css/main.css'

const SearchBar = () => {
  return (
    <>
    <div className='h_column_center2 cat_box'>
        <div className='h_row_center2 cat_box_size'>
            <div className='category category_size'>
                <ul className='h-44 mb-0 ml-55'>
                    <li className='cat_start flex'>
                        <div className='word_style'>먹기</div>
                        <img src={require('../img/eat2.png')} alt='eat_cat' className='img-size' />
                    </li>
                    <li className='cat_other flex'>
                        <div className='word_style'>마시기</div>
                        <img src={require('../img/drink3.png')} alt='drink_cat' className='img-size' />
                    </li>
                    <li className='cat_other flex'>
                        <div className='word_style'>놀기</div>
                        <img src={require('../img/dice.png')} alt='play_cat' className='img-size' />
                    </li>
                    <li className='cat_other flex'>
                        <div className='word_style'>걷기</div>
                        <img src={require('../img/walk2.png')} alt='walk_cat' className='img-size' />
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div className='h_column_center2 cat_box'>
        <div className='h_row_center2 cat_box_size'>
            <div className='category category_size'>
                <ul className='h-44 mb-0 ml-60'>
                    <li className='cat_start flex'>
                        <div className='word_style'>한식</div>
                    </li>
                    <li className='cat_other flex'>
                        <div className='word_style'>양식</div>
                    </li>
                    <li className='cat_other flex'>
                        <div className='word_style'>중식</div>
                    </li>
                    <li className='cat_other flex'>
                        <div className='word_style'>일식</div>
                    </li>
                    <li className='cat_other flex'>
                        <div className='word_style'>분식</div>
                    </li>
                    <li className='cat_other flex'>
                        <div className='word_style'>패스트푸드</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </>
  )
}

export default SearchBar