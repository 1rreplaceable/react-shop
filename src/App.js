import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import data from './data.js';
import {Container, Nav, Navbar, Row, Col} from 'react-bootstrap'
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import Detail from './pages/Detail'
function App() {
    let [shoes] = useState(data)
    let navigate = useNavigate(); // 페이지 이동을 도와줌

    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">ReachShop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
                        <Nav.Link onClick={()=>{navigate('/detail')}}>Cart</Nav.Link>
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
                                            <Goods shoes={shoes[i]}></Goods>
                                        )
                                    })
                                }
                            </Row>
                        </Container>
                    </>
                }/>

                <Route path='/detail/:id' element={<Detail shoes={shoes}/>}/>
            </Routes>
        </div>
    );
}

function Goods(props) {
    return (
        <Col>
            <img src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} width="80%"/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
        </Col>
    );
}

export default App;
