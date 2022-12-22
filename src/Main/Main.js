import React from 'react'
import MainTop from './MainTop'
import MainHot from './MainHot'

import {Container} from 'react-bootstrap'
import Layout from '../layouts/Layout'

const Main = () => {
  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <MainTop />
        <MainHot />
      </Container>
    </Layout>
  )
}

export default Main