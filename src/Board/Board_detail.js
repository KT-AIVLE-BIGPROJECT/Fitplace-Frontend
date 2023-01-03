import React from 'react'
import { useState, useEffect } from "react";
import {Container} from 'react-bootstrap'
import Layout from '../layouts/Layout'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Footer from '../layouts/Footer';
import { addComment } from '@babel/types';
import nameMasking from '../functions/functions';

const Board_detail = () => {
    const [ data, setData ] = useState({});
    const location = useLocation();
    const getPath = location.pathname.split('/')

    const [nickname, setNickname] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [pk, setPk] = useState(getPath[getPath.length-1]); // URL에서 게시글 id 받아옴
    const [results, setResults] = useState([]);
    const [comment, setComment] = useState(""); // 작성하는 댓글
    const [commentList, setCommentList] = useState([]); // 불러오는 댓글
    const [thisCommentList, setThisCommentList] = useState([]); // 이 게시글의 댓글
    const [published_date, setPublished_date] = useState("");
    const [image, setImage] = useState("");

    const token = sessionStorage.getItem("token");

    // var link =  document.location.pathname.replace('/board/detail/','');
    var modify = '/board/edit/' + pk;
    // const date = published_date.split('T')

    // ------------------- [ 컴포넌트 ] -------------------
    const LoadComments = () => {
        if(commentList != []){
            return (
                <div className='comment-box'>
                    <h5>
                        댓글 {thisCommentList.length}개
                    </h5>
                    {thisCommentList.map((comment, idx) => {
                        return (
                            <li key={idx} style={{marginBottom: "5px"}}>
                                <div>
                                    작성자 : {nameMasking(comment.profile.nickname)}
                                </div>
                                <div>
                                    내용 : {comment.text}
                                </div>
                            </li>
                        )
                    })}
                </div>
            )
        }
    }

    // ------------------- [ 함수 ] -------------------
    // 댓글 등록 버튼 함수
    const addComment = (event) => {
        event.preventDefault();
        let commentForm = {
            "post": pk,
            "text": comment
        }
        axios.post(`http://localhost:8000/comments/`, commentForm, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then((response) => {
            if(response.status < 300){
                alert("댓글이 등록되었습니다.");
                window.location.replace(`http://localhost:3000/board/detail/${pk}/`);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    // 해당 게시글에 대한 댓글만 필터링 해주는 함수
    const commentFiltering = () => {
        var arr = commentList;
        var new_arr = [];
        for(var i=0; i<arr.length; i++){
            if(arr[i].post === pk){
                console.log(arr[i].post, pk);
                new_arr.push(arr[i]);
            }
        }
        setThisCommentList(new_arr);
        console.log(thisCommentList);
    };

    // ------------------- [ useEffect ] -------------------
    useEffect(()=>{
        console.log("AAA", pk);
        axios
          .get(`http://localhost:8000/posts/${pk}/`, {
          })
          .then((response)=>{
            setNickname(response.data.profile.nickname);
            setPk(response.data.pk);
            setTitle(response.data.title);
            setBody(response.data.body);
            setPublished_date(response.data.published_date);
            setImage(response.data.image);
          })
      },[])
    useEffect(()=>{
    axios
        .get('http://localhost:8000/comments/')
        .then((response)=>{
            console.log(response);
            setCommentList(response.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
    useEffect(()=>{
    commentFiltering();
    }, [commentList])

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
                        <dd>{nameMasking(nickname)}</dd>
                    </dl>
                    <dl>
                        <dt>작성일</dt>
                        <dd>{published_date.substr(0,10) + " " + published_date.substr(12,7)}</dd>  
                    </dl>
                </div>
                <div class="cont">
                    {body}
                </div>
            </div>
            <div>
                <a href={image} target="_blank"> 첨부파일 확인</a>
            </div><br/>
            <LoadComments></LoadComments>
            <div class="mb-3">
                <h4 for="exampleFormControlTextarea1" class="form-label">댓글 작성</h4>
                <div>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
                    <button onClick={addComment} className="board_write_button">
                        댓글 등록
                    </button>
                </div>
            </div>
            <div class="bt_wrap">
                <a href="/board" class="on">목록</a>
                <a class = "board_cancel_button" href={modify}>수정</a>
            </div>
        </div>
    </div>


    </Layout>
  )
}

export default Board_detail