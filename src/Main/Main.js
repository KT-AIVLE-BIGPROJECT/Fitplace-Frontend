import React from 'react'
import MainTop from './MainTop'
import MainHot from './MainHot'
import MainSns from './MainSns'

import {Container} from 'react-bootstrap'
import Layout from '../layouts/Layout'

const Main = () => {
  return (
    <Layout>
      
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <MainTop />
        <MainHot />
        <MainSns />
      </Container>
    </Layout>
  )
}

export default Main