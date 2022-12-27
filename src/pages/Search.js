import React from 'react'
import {Container} from 'react-bootstrap'
import SearchPlace from './SearchPlace'
import Layout from '../layouts/Layout'

const Search = () => {
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