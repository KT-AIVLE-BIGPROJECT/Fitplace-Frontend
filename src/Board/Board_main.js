import React from 'react'
import { useState, useEffect } from "react";
import "./Board_main.css"
import "./Board_style.css"
import Board_pagination from "./Board_pagination";
import axios from 'axios';


function Board_main(){
    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const [count, setCount] = useState("");
    const [results, setResults] = useState([]);

  
    useEffect(()=>{
      axios
        .get("http://localhost:8000/posts/", {
        })
        .then((response)=>{
          setCount(response.data.count);
          setResults(response.data.results);

        })
    },[])

    function Board_Read(){
      const list = []
      for(let i=0;i < 10;i++){
        list.push(
          <div>
            <div className="num">{results[i].pk}</div>
            <div className="title"><a href="/board/detail/">{results[i].title}</a></div>
            <div className="writer">익명</div>
            <div className="date">{results[i].published_date}</div>
          </div>
        )
      }
      return list
    }

    


    

    return (
    <div class="board_container">
        <h1 class = "FAQ">FAQ</h1>
        <p>질문을 남겨주세요.</p>

        <label>
        페이지 당 표시할 게시물 수:&nbsp;
            <select
            type="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
            >
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            </select>
        </label>

        <main>
          <article>
            <h3>
              {count}
            </h3>
          </article>
      </main>
      

      <body>
        <div class="board_list_wrap">
            <div class="board_list">
                <div class="top">
                    <div class="num">번호</div>
                    <div class="title">제목</div>
                    <div class="writer">글쓴이</div>
                    <div class="date">작성일</div>
                </div>
                
                <Board_Read />
                
    
                
                <div>
                    {/* <div class="num">{results[0].pk}</div> */}
                    {/* <div class="title"><a href="/board/detail">{results[0].title}</a></div>
                    <div class="writer">익명</div>
                    <div class="date">{results[0].published_date}</div> */}
                </div>

                <div>
                    {/* <div class="num">{results[1].pk}</div> */}
                    {/* <div class="title"><a href="/board/detail">{results[1].title}</a></div>
                    <div class="writer">익명</div>
                    <div class="date">{results[1].published_date}</div> */}
                </div>
                
            </div>
            <footer>
                <Board_pagination
                total={count}
                limit={limit}
                page={page}
                setPage={setPage}
                />
            </footer>
            {/* <div class="board_page">
                <a href="#" class="bt first">&lt;&lt;</a>
                <a href="#" class="bt prev">&lt;</a>
                <a href="#" class="num on">1</a>
                <a href="#" class="num">2</a>
                <a href="#" class="num">3</a>
                <a href="#" class="num">4</a>
                <a href="#" class="num">5</a>
                <a href="#" class="bt next">&gt;</a>
                <a href="#" class="bt last">&gt;&gt;</a>
            </div> */}
            <div class="bt_wrap">
                <a href="/board/write" class="on">글쓰기</a>
            </div>
        </div>
        </body>
    </div>
    
    )
}

export default Board_main