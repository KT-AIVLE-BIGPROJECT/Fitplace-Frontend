import React from 'react'
import {Container} from 'react-bootstrap'

import Layout from '../layouts/Layout'

const Search = () => {
  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <div>검색 화면입니다.</div>
      </Container>
    </Layout>
  )
}

export default Search