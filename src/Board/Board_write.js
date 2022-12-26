import React, {useState, useEffect} from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import Layout from '../layouts/Layout'
import axios from 'axios';

const token = localStorage.getItem("token"); // 사용자 토큰

const Board_write = () => {
    const [title, setTitle] = useState("");
    const [user, setUser] = useState("");
    const [body, setBody] = useState("");


    const pressBoardwrite = (event) => {
        event.preventDefault();
        console.log("[Board_write.js] ==> pressBoardwrite called.");
        axios
          .post("http://localhost:8000/posts/", {
            profile: {
                "Authorization": `Token ${token}`
            },
            title: title,
            body: body,
          })
          .then((response) => {
            console.log(response);
            if (response.status === 201){
              alert("등록이 완료되었습니다!");
              //navigate('/');
              window.location.replace('http://localhost:3000/board/');
            } else {
             alert("입력정보를 다시 확인해주세요."); // 예외처리 더 필요할듯
            }
          })
      }


    return (
    <Layout>
    <div class="board_wrap">
        <div class="board_title">
            <strong class = "FAQ">FAQ</strong>
            <p>질문을 남겨주세요.</p>
        </div>
        <div class="board_write_wrap">
            <div class="board_write">
                <div class="title">
                    <Form>
                        <Form.Group>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">제목</label>
                            <input type="title" class="form-control" id="exampleFormControlInput1" value = {title} placeholder="제목을 입력해주세요." onChange={(event) => setTitle(event.target.value)}>
                            </input>
                        </div>
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">작성자</label>
                            <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={user} onChange={(event) => setUser(event.target.value)}/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">내용</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={body} onChange={(event) => setBody(event.target.value)}></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">파일 첨부</label>
                            <input class="form-control" type="file" id="formFile"/>
                        </div>
                        </Form.Group>                    
                    <Form.Group>
                        <div class="bt_wrap">
                            <button class="board_write_button" type="submit" onClick={pressBoardwrite}>
                                등록
                            </button>
                            
                            <button class="board_cancel_button" href="/board">취소</button>
                        </div>
                    </Form.Group>
                </Form>
                </div>
            </div>
        </div>
    </div>
    </Layout>
    )
}

export default Board_write