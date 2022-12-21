import React from 'react'
import "./Board_main.css"

const Board_main = () => {
  return (
    <div class="board_container">
        <div class="board_row">
            <div class="col">
                <table class="table-fill">
                <thead>
                    <tr>
                    <th class="text-center">글번호</th>
                    <th class="text-center">제목</th>
                    <th class="text-center">글쓴이</th>
                    <th class="text-center">날짜</th>
                    <th class="text-center">조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td class="text-center">1</td>
                    <td class="text-center">질문이요</td>
                    <td class="text-center">홍길동</td>
                    <td class="text-right">2202-12-20</td>
                    <td class="text-center">1</td>
                    </tr>
                    <tr>
                    <td class="text-center">1</td>
                    <td class="text-center">질문이요</td>
                    <td class="text-center">홍길동</td>
                    <td class="text-right">2202-12-20</td>
                    <td class="text-center">1</td>
                    </tr>
                    <tr>
                    <td class="text-center">1</td>
                    <td class="text-center">질문이요</td>
                    <td class="text-center">홍길동</td>
                    <td class="text-right">2202-12-20</td>
                    <td class="text-center">1</td>
                    </tr>
                    <tr>
                    <td class="text-left">1</td>
                    <td class="text-center">질문이요</td>
                    <td class="text-center">홍길동</td>
                    <td class="text-right">2202-12-20</td>
                    <td class="text-center">1</td>
                    </tr>
                    <tr>
                    <td class="text-left">1</td>
                    <td class="text-center">질문이요</td>
                    <td class="text-center">홍길동</td>
                    <td class="text-right">2202-12-20</td>
                    <td class="text-center">1</td>
                    </tr>
                    <tr>
                    <td class="text-left">1</td>
                    <td class="text-center">질문이요</td>
                    <td class="text-center">홍길동</td>
                    <td class="text-right">2202-12-20</td>
                    <td class="text-center">1</td>
                    </tr>
                    
                </tbody>
                <tfoot>
                    
                </tfoot>
                </table>
                <section class="content">
                    <div class="download">
                        <a class="button" href="https://github.com/victordarras/HeavyTable.js"> 글쓰기</a>
                    </div>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Board_main