import React from 'react'
import {Container} from 'react-bootstrap'
import Board_main from "../Board/Board_main"

import Layout from '../layouts/Layout'

const Board = () => {
  return (
    <Layout>
      <Container className='container_style' style={{minHeight: "75vh"}}>
        <Board_main />
      </Container>
    </Layout>
  )
}

export default Board