import React from 'react'
import { useState, useEffect } from "react";
import "./Board_main.css"
import "./Board_style.css"
import Board_pagination from "./Board_pagination";
import axios from 'axios';
import { Link } from 'react-router-dom';


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


    const Board_Read = () => {
      return (
        <div>
          {results.slice(offset, offset + limit).map((result, idx) => {
            const date = result.published_date.split('T')
            return (
              <div class = "Board_Reader">
                <div className="num">{result.pk}</div>
                <div className="title"><Link to={`/board/detail/${result.pk}`}>{ result.title }</Link>
                </div>
                <div className="writer">익명</div>
                <div className="date">{date[0]}</div>
              </div>
            )
          })}
          </div>
      )
    }
      
     

    


    

    return (
    <div class="board_container">
        <h1 class = "FAQ">FAQs</h1>
        <p>질문을 남겨주세요.</p>

        <label>
        페이지 당 표시할 게시물 수:&nbsp;
            <select
            type="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
            >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            </select>
        </label>
      

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
                
            </div>
            <footer>
                <Board_pagination
                total={count}
                limit={limit}
                page={page}
                setPage={setPage}
                />
            </footer>
            
            <div class="bt_wrap">
                <a href="/board/write" class="on">글쓰기</a>
            </div>
        </div>
        </body>
    </div>
    
    )
}

export default Board_main