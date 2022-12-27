import React from 'react';
import { Container, Modal } from 'react-bootstrap';

const Footer = () => {
  
  const moveTo1 = () => {
    window.location.replace('http://localhost:3000/privacy');
  }
  const moveTo2 = () => {
    window.location.replace('http://localhost:3000/tos');
  }
  
  return (
    <footer>
        <Container>
            <div>
                <p>
                    <a onClick={moveTo1}>개인정보 처리방침 </a>
                    <a onClick={moveTo2}>이용약관</a>
                </p>
                <p class="copyright">© 2022 KT Corp. All rights reserved.</p>
            </div>
        </Container>
    </footer>
  )
}

export default Footer