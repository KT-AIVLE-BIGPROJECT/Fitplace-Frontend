import React from 'react'
import {Container} from 'react-bootstrap'
import Layout from '../layouts/Layout'

const Board_detail = () => {
  return (
    <Layout>
    <div class="board_wrap">
        <div class="board_title">
            <strong>FAQ</strong>
            <p>질문을 남겨주세요.</p>
        </div>
        <div class="board_view_wrap">
            <div class="board_view">
                <div class="title">
                    글 제목
                </div>
                <div class="info">
                    <dl>
                        <dt>번호</dt>
                        <dd>1</dd>
                    </dl>
                    <dl>
                        <dt>글쓴이</dt>
                        <dd>홍길동</dd>
                    </dl>
                    <dl>
                        <dt>작성일</dt>
                        <dd>2022-02-02</dd>
                    </dl>
                    <dl>
                        <dt>조회</dt>
                        <dd>1</dd>
                    </dl>
                </div>
                <div class="cont">
                    글 내용
                </div>
            </div>
            <div class="bt_wrap">
                <a href="/board" class="on">목록</a>
                <a href="/board/edit">수정</a>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default Board_detail