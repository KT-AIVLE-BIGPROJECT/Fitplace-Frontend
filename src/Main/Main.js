import React from 'react'
import MainTop from './MainTop'
import MainHot from './MainHot'

const Main = () => {
  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <MainTop />
        <MainHot />
    </>
  )
}

export default Main