import React from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap';
import Layout from '../layouts/Layout'

const Board_write = () => {
  return (
    <Layout>
    <div class="board_wrap">
        <div class="board_title">
            <strong>FAQ</strong>
            <p>질문을 남겨주세요.</p>
        </div>
        <div class="board_write_wrap">
            <div class="board_write">
                <div class="title">
                <Form>
                <Form.Group className="title">
                    <Form.Label>제목</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="제목을 입력하시오."
                    />
                </Form.Group>
                
                </Form>
                </div>
                <div class="cont">
                    <textarea placeholder="내용 입력">
                    </textarea>
                </div>
                <div class="bt_wrap">
                    <a href="view.html" class="on">등록</a>
                    
                    <a href="/board">취소</a>
                </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default Board_write