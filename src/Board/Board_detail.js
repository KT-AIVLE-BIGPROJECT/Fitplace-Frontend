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
import { useNavigate } from 'react-router-dom';

const Board_detail = () => {
    const [ data, setData ] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const getPath = location.pathname.split('/');
    const num = location.state.num;

    const [profile, setProfile] = useState({}) // 게시글 작성자 프로필
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
                <>
                    <div className='flex j-bw'>
                        <div>
                            <h5 className='attach_text mt-20'>
                                댓글 {thisCommentList.length}개
                            </h5>
                        </div>
                    </div>
                    <div className='comment-box'>
                        {/* <h5>
                            댓글 {thisCommentList.length}개
                        </h5> */}
                        {thisCommentList.map((comment, idx) => {
                            return (
                                <li key={idx} style={{marginBottom: "20px"}}>
                                    <div>
                                        {nameMasking(comment.profile.nickname)} {comment.published_date.substr(0,10) + " " + comment.published_date.substr(12,7)}
                                    </div>
                                    <div>
                                        {comment.text}
                                    </div>
                                </li>
                            )
                        })}
                    </div>
                </>
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
                window.location.replace(`http://localhost:3000/board/detail/${pk}`);
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
    // 게시글 수정 버튼 사용자 승인 함수
    const goPostEdit = () => {
        axios
            .get(`http://localhost:8000/users/profile/`, {
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
            .then((response) => {
                var my = Object.entries(response.data).toString();
                var author = Object.entries(profile).toString();
                // console.log("사용자 프로필", response.data);
                // console.log("작성자 프로필", profile);
                if(my == author){
                    navigate(`/board/edit/${pk}`);
                }else{
                    alert("해당 글에 대한 수정 권한이 없습니다.");
                    // window.location.replace(`/board/detail/${pk}`);
                }
            })
    }
    // 게시글 삭제 버튼 클릭 함수
    const pressDelete = () => {
        axios
            .get(`http://localhost:8000/users/profile/`, {
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
            .then((response) => {
                var my = Object.entries(response.data).toString();
                var author = Object.entries(profile).toString();
                if(my == author){
                    if (!window.confirm("정말 삭제하시겠습니까?")) {
                        // 취소(아니오) 버튼 클릭 시 이벤트

                    } else {
                        // 확인(예) 버튼 클릭 시 이벤트
                        axios
                        .delete(`http://localhost:8000/posts/${pk}/`, {
                            headers: {
                                "Authorization": `Token ${token}`
                            }
                        })
                        .then(()=>{
                            alert("게시글이 삭제되었습니다.");
                            navigate(`/board/`);
                        })
                    }
                }else{
                    alert("해당 글에 대한 삭제 권한이 없습니다.");
                    // window.location.replace(`/board/detail/${pk}`);
                }
            })
    };

    // ------------------- [ useEffect ] -------------------
    useEffect(()=>{
        console.log("AAA", pk);
        axios
          .get(`http://localhost:8000/posts/${pk}/`, {
          })
          .then((response)=>{
            setProfile(response.data.profile);
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
        <Container className='container_style'>
    <div class="board_wrap">
        <div className='linemap area'>
            <div>
                <a href="/"><img className="homeImg" src={require("../img/home.png")}/></a>
            </div>
            <div className='subtitle'>
                &gt;
                <span>자유게시판</span>
            </div>
        </div>
        <div class="board_title">
            <strong class = "FAQ">자유게시판</strong>
            {/* <p>질문을 남겨주세요.</p> */}
        </div>
        <div class="board_view_wrap">
            <div class="board_view">
                <div class="title">
                    <div class="flex hot-category">
                    {title}
                    <div className='flex ai-center'>
                        <div>
                            <a onClick={goPostEdit} className={token?"change_btn mr-12":"change_remove mr-12 display-none"} >수정</a>
                        </div>
                        <div>
                            <a onClick={pressDelete} className={token?"remove_btn mr-12":"change_remove mr-12 display-none"}>삭제</a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="info">
                    <dl>
                        <dt>번호</dt>
                        <dd>{num}</dd>
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
            <div className='attach_box'>
                <p className='attach_text'>첨부 파일 확인</p>
                <div>
                    <div className='flex'>
                        <div className='mr-7'>
                            <img className="homeImg" src={require("../img/clip.png")}/>
                        </div>
                        <div>
                            <a href={image} target="_blank">{image}</a>
                        </div>
                    </div>
                </div><br/>
            </div>
            
            
            <hr/>
            <LoadComments></LoadComments>
            <div className={token?"mb-3":"mb-3 display-none"}>
                <h4 for="exampleFormControlTextarea1" class="form-label attach_text mt-50">댓글 작성</h4>
                <div>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
                    <div className='flex cmt_btn'>
                        <button onClick={addComment} className="cmt_submit">
                            댓글 등록
                        </button>
                    </div>
                </div>
            </div>
            {/* <div class="bt_wrap">
                <a href="/board" class="on">목록</a>
                <a onClick={goPostEdit} class = "board_cancel_button" >수정</a>
                <a onClick={pressDelete} class = "board_cancel_button" >삭제</a>
            </div> */}


            <div className='btn_wrap'>
                <a href="/board" className="list_btn">목록</a>
            </div>                

            


        </div>
    </div>

    </Container>
    </Layout>
  )
}

export default Board_detail