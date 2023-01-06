import React, {useState, useEffect} from 'react'
import { Modal, Button, Form, Container } from 'react-bootstrap';
import Layout from '../layouts/Layout'
import axios from 'axios';


var link =  document.location.pathname.replace('/board/edit/','');
var modify = '/board/detail/' + link

const token = sessionStorage.getItem("token");
function Board_edit(){
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [user, setUser] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");

    const results = {
        title: title,
        body: body,
      }
    
    const results_re = {
        title: title,
        body: body,
        image: image[0]
      }


    var link =  document.location.pathname.replace('/board/edit/','');


    useEffect(()=>{
        axios.get(`http://localhost:8000/posts/${link}/`,
        results,
    {
        headers: {
            "content-type": "multipart/form-data",
            "Authorization": `Token ${token}`
        },
    }
    )
    .then((response) => {
        setTitle(response.data.title);
        setBody(response.data.body);
    })
    }, [])

    const HandleQuestionSubmit = async({results_re}) => {
        axios.put(`http://localhost:8000/posts/${link}/`,
            results_re,
              {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": `Token ${token}`
                },
              }
            )
            .then((response) => {
                if(response.status < 300) {
                  alert("수정이 완료되었습니다!");
                  window.location.replace("/board");
                }
                else{
                    alert("수정이 실패했습니다!");
                }

              })
        }



    return (
    <Layout>
        <Container className='container_style'>
    <div class="board_wrap">
        <div class="board_title">
            <strong class = "FAQ">자유게시판</strong>
            <p>글을 수정해주세요.</p>
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
                            <input class="form-control" type="file" id="formFile" onChange={(event) => setImage(event.target.files)}/>
                        </div>
                        </Form.Group>  
                    <div class="bt_wrap">
                        <button className="board_edit_button" onClick={() => HandleQuestionSubmit({results_re})}>
                            수정
                        </button>
        
                        <a class="board_cancel_button" href = {modify}>취소</a>
                    </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    </Container>
    </Layout>
  )
}

export default Board_edit