import React from 'react'
import { useState, useEffect } from "react";
import "./Board_main.css"
import "./Board_style.css"
import Board_pagination from "./Board_pagination";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import nameMasking from '../functions/functions';


function Board_main(){
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]); // 받아온 게시글 데이터
    const [postsWithIdx, setPostsWithIdx] = useState(0); // 인덱스 번호 붙은 게시글 데이터
    const [count, setCount] = useState("");
    const [limit, setLimit] = useState(10);
    const token = sessionStorage.getItem("token");
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    // const [results, setResults] = useState([]);

    // ------------------------- [ 함수 ] -------------------------

  
    // ------------------------- [ useEffect ] -------------------------
    useEffect(()=>{
      axios
        .get("http://localhost:8000/posts/", {
        })
        .then((response)=>{
          setCount(response.data.count);
          setPosts(response.data.results);
          console.log(count);
          console.log(posts);
        })
    },[])
    useEffect(()=>{
      if(posts != []){
        var post_index = posts;
        for(var i=0; i<count; i++){
          post_index[i]["post_num"] = i+1;
        }
        console.log(post_index);
        setPostsWithIdx(post_index);
      }
    }, [count, posts]);


    // ------------------------- [ 컴포넌트 ] -------------------------
    const Board_Read = () => {
      if(postsWithIdx != 0){
        return (
          <div>
            {/* {results.slice(offset, offset + limit).map((result, idx) => { */}
            {postsWithIdx.slice(offset, offset + limit).map((post, idx) => {
              const date = post.published_date.split('T');
              return (
                <div class = "Board_Reader">
                  <div className="num">{count-post.post_num+1}</div>
                 
                    {/* <Link to={`/board/detail/${post.pk}`} className="title">{ post.title }
                    </Link> */}
                    <div onClick={()=>{
                      navigate(`/board/detail/${post.pk}`, {
                        state: {
                          num: count-post.post_num+1
                        }
                      });
                      }
                    }
                      className="title"
                    >
                      { post.title }
                    </div>
                  
                  <div className="writer">{nameMasking(post.profile.nickname)}</div>
                  <div className="date">{date[0]}</div>
                </div>
              )
            })}
            </div>
        )
      }else{
        return(
          <div>불러오는 중...</div>
        )
      }

    }
      
     

    


    

    return (
    <div class="board_container">
      <div className='linemap area'>
          <div>
              <a href="/"><img className="homeImg" src={require("../img/home.png")}/></a>
          </div>
          <div className='subtitle'>
              &gt;
              <span>자유게시판</span>
          </div>
      </div>
      <br/>
      <div>
        <div className='top_box'>
        <h1 class = "FAQ">자유게시판</h1>
        <p className='font-20'>자유롭게 의견을 나눠주세요.</p>
        </div>
      </div>
      <div className='align-r font-16'>
        <label>
        페이지 당 표시할 게시물 수:&nbsp;
            <select
            type="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
            className="bo_w_select"
            >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            </select>
        </label>
      </div>

      <body>
        <div class="board_list_wrap mt-20">
            <div class="board_list">
                <div class="top">
                    <div class="num">번호</div>
                    <div class="title">제목</div>
                    <div class="writer">글쓴이</div>
                    <div class="date">작성일</div>
                </div>
                
                <Board_Read />
                
            </div>

            <div class={token?"bt_wrap on":"btn_wrap on display-none"}>
                <a href="/board/write" class="on">글쓰기</a>
            </div>

            <div>
                <Board_pagination
                total={count}
                limit={limit}
                page={page}
                setPage={setPage}
                />
            </div>
            
            {/* <div class="bt_wrap">
                <a href="/board/write" class="on">글쓰기</a>
            </div> */}
        </div>
        </body>
    </div>
    
    )
}

export default Board_main