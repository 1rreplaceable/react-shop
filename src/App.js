import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import data from './data.js';
import {Container, Nav, Navbar, Row, Col, Button} from 'react-bootstrap'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import Detail from './pages/Detail'
import axios from "axios";
import Cart from './pages/Cart'

function App() {
    let [shoes, setShoes] = useState(data)
    let navigate = useNavigate(); // 페이지 이동을 도와줌
    let [clickCnt, setClickCnt] = useState(2);
    let [isLoading, setIsLoading] = useState(false);
    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">ReachShop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => {
                            navigate('/')
                        }}>Home</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate('/cart')
                        }}>Cart</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path='/' element={
                    <>
                        <div className="main-bg"></div>
                        <Container>
                            <Row>
                                {
                                    shoes.map((a, i) => {
                                        return (
                                            <Goods shoes={shoes[i]} key={i}></Goods>
                                        )
                                    })
                                }
                            </Row>
                        </Container>
                        <Button onClick={() => {
                            setClickCnt(clickCnt + 1);
                            setIsLoading(true);
                            axios.get(`https://codingapple1.github.io/shop/data${clickCnt}.json`)
                                .then((result) => {
                                    let copy = [...shoes, ...result.data];
                                    setShoes(copy);
                                    setIsLoading(false);
                                })
                                .catch(() => {
                                    setIsLoading(false);
                                })
                            // axios.post('/sad', {name :'kim'})
                        }}>더보기
                        </Button>
                        <div className={isLoading ? 'loading' : 'hidden'}>로딩중입니다.</div>
                    </>
                }/>

                <Route path='/detail/:id' element={
                    <Detail shoes={shoes}/>
                }/>
                <Route path='/cart' element={<Cart/>}/>


            </Routes>
        </div>
    );
}

function Goods(props) {
    return (
        <Col md={4}>
            <img src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width="80%"/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
        </Col>
    );
}

export default App;
