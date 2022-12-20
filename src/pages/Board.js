import React from 'react'
import {Container} from 'react-bootstrap'

import Layout from '../layouts/Layout'

const Board = () => {
  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <div>게시판 화면입니다.</div>
      </Container>
    </Layout>
  )
}

export default Board