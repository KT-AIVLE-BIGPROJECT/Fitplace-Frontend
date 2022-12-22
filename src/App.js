import {Container} from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './Main/Main';
import './App.css';
import SignUp from './pages/SignUp';
import SearchPage from './search/SearchPage';
import LikingCheck from './pages/LikingCheck';

function App() {
  return (
    <BrowserRouter>
      <Layout>
          <Container className='container_style' style={{minHeight: "75vh"}}>
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="/liking" element={<LikingCheck />}></Route>
            </Routes>
          </Container>
      </Layout>
    </BrowserRouter>
  );
}

export default App;