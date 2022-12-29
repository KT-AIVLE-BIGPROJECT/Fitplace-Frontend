import React, {useState, useEffect} from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap';
import Layout from '../layouts/Layout'
import axios from 'axios';


const token = sessionStorage.getItem("token");
function Board_edit(){
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [user, setUser] = useState("");
    const [body, setBody] = useState("");

    const results = {
        title: title,
        body: body
      }

    var link =  document.location.pathname.replace('/board/edit/','');


    useEffect(()=>{
        axios.get(`http://localhost:8000/posts/${link}/`,
        results,
    {
        headers: {
            "Authorization": `Token ${token}`
        },
    }
    )
    .then((response) => {
        setTitle(response.data.title);
        setBody(response.data.body);
    })
    }, [])

    const HandleQuestionSubmit = async({results}) => {
        axios.put(`http://localhost:8000/posts/${link}/`,
              results,
              {
                headers: {
                    "Authorization": `Token ${token}`
                },
              }
            )
            .then((response) => {
                if(response.status < 300) {
                  alert("등록이 완료되었습니다!");
                  window.location.replace('http://localhost:3000/board/');
                }
              })
        }



    return (
    <Layout>
    <div class="board_wrap">
        <div class="board_title">
            <strong class = "FAQ">FAQs</strong>
            <p>질문을 남겨주세요.</p>
        </div>
        <div class="board_write_wrap">
            <div class="board_write">
                <div class="title">
                    <Form>
                        <Form.Group>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">제목</label>
                            <input type="title" class="form-control" id="exampleFormControlInput1" value = {title} onChange={(event) => setTitle(event.target.value)}>
                            </input>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">내용</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={body} onChange={(event) => setBody(event.target.value)}>
                            </textarea>
                        </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">파일 첨부</label>
                            <input class="form-control" type="file" id="formFile"/>
                        </div>
                        </Form.Group>  
                    <div class="bt_wrap">
                        <button className="board_write_button" onClick={() => HandleQuestionSubmit({results})}>
                            수정
                        </button>
        
                        <button class="board_cancel_button" type="submit" onClick= "cancel_Board(); return false;">취소</button>
                    </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default Board_edit