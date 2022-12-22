import React from 'react'
import "./Board_main.css"
import "./Board_style.css"

const Board_main = () => {
  return (
    <div class="board_container">
        <h1>FAQ</h1>
        <p>질문을 남겨주세요.</p>
        
        <div class="board_list_wrap">
            <div class="board_list">
                <div class="top">
                    <div class="num">번호</div>
                    <div class="title">제목</div>
                    <div class="writer">글쓴이</div>
                    <div class="date">작성일</div>
                    <div class="count">조회</div>
                </div>
                <div>
                    <div class="num">1</div>
                    <div class="title"><a href="/board/detail">글</a></div>
                    <div class="writer">홍길동</div>
                    <div class="date">2022-02-02</div>
                    <div class="count">1</div>
                </div>
                
            </div>
            <div class="board_page">
                <a href="#" class="bt first">&lt;&lt;</a>
                <a href="#" class="bt prev">&lt;</a>
                <a href="#" class="num on">1</a>
                <a href="#" class="num">2</a>
                <a href="#" class="num">3</a>
                <a href="#" class="num">4</a>
                <a href="#" class="num">5</a>
                <a href="#" class="bt next">&gt;</a>
                <a href="#" class="bt last">&gt;&gt;</a>
            </div>
            <div class="bt_wrap">
                <a href="/board/write" class="on">글쓰기</a>
            </div>
        </div>
    </div>
  )
}

export default Board_main