import React from 'react'
import { useState, useEffect } from "react";
import {Container} from 'react-bootstrap'
import Layout from '../layouts/Layout'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// const token = sessionStorage.getItem("token");

const Board_detail = () => {
    const [ data, setData ] = useState({});
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [pk, setPk] = useState("");
    const [results, setResults] = useState([]);
    const [comment, setComment] = useState([]);
    const [published_date, setPublished_date] = useState("");

    var link =  document.location.pathname.replace('/board/detail/','');
    var modify = '/board/edit/' + link

    useEffect(()=>{
        axios
          .get(`http://localhost:8000/posts/${link}/`, {
          })
          .then((response)=>{
            console.log(link);
            setPk(response.data.pk);
            setTitle(response.data.title);
            setBody(response.data.body);
            setPublished_date(response.data.published_date);
  
          })
      },[])

      const date = published_date.split('T')

    //   const comments = {
    //     title: title,
    //     body: body,
     
    //   }

    //   const Comment_button = async({comments}) => {
    //     axios.put(`http://localhost:8000/posts/${link}/`,
    //         comments,
    //         //     {
    //         //     headers: {
    //         //         "Authorization": `Token ${token}`
    //         //     },
    //         //   }
    //         )
    //         .then((response) => {
    //             if(response.status < 300) {
    //               alert("등록이 완료되었습니다!");
    //               window.location.replace(`http://localhost:8000/posts/${link}/`);
    //             }
    //           })
    //     }


    return (
    <Layout>
    <div class="board_wrap">
        <div class="board_title">
            <strong class = "FAQ">FAQs</strong>
            <p>질문을 남겨주세요.</p>
        </div>
        <div class="board_view_wrap">
            <div class="board_view">
                <div class="title">
                    {title}
                </div>
                <div class="info">
                    <dl>
                        <dt>번호</dt>
                        <dd>{pk}</dd>
                    </dl>
                    <dl>
                        <dt>글쓴이</dt>
                        <dd>익명</dd>
                    </dl>
                    <dl>
                        <dt>작성일</dt>
                        <dd>{date[0]}</dd>  
                    </dl>
                </div>
                <div class="cont">
                    {body}
                </div>
            </div>
            {/* <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">댓글</label>
                            <button className="board_write_button" onClick={() => Comment_button({comments})}>
                            댓글 등록
                            </button>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
                        </div> */}
            <div class="bt_wrap">
                <a href="/board" class="on">목록</a>
                <a href={modify}>수정</a>
            </div>
        </div>
    </div>


    </Layout>
  )
}

export default Board_detail