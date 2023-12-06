import {Nav, Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../store";


function Detail(props) {
    const [isVisible, setIsVisible] = useState(true);
    let [count, setCount] = useState(0);
    let {id} = useParams();
    let sh = props.shoes.find((x) => {
        return x.id == id
    });
    let [inputValue, setInputValue] = useState('');
    let [tab, setTab] = useState(0);
    let [fadePage, setFadePage] = useState('');
    let dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            setFadePage('end');
        }, 100)
        return () => {
            setFadePage('');
        }
    }, [])
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // 2초 후에 className이 "alert"인 div를 숨기기
            setIsVisible(false);
        }, 2000);
        return () => {
            clearTimeout(timeoutId)
        }
    }, []);

    useEffect(() => {
        if (isNaN(inputValue) === true) {
            alert('숫자만 입력하세요!');
        }
    }, [inputValue])


    return (
        <Container className={'start ' + fadePage}>
            {/*<div className={isVisible ? 'alert alert-warning' : 'hidden'}>*/}
            {/*    2초 이내 구매시 할인*/}
            {/*</div>*/}
            {/*<button onClick={() => {*/}
            {/*    setCount(count + 1)*/}
            {/*}}>버튼*/}
            {/*</button>*/}
            <Row>
                <Col>
                    <img src={`https://codingapple1.github.io/shop/shoes${sh.id + 1}.jpg`} width="80%"/>
                    <input onChange={(e) => {
                        setInputValue(e.target.value)
                    }}/>
                    <h4 className="pt-5">{sh.title}</h4>
                    <p>{sh.content}</p>
                    <p>{sh.price}원</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addItem({id: sh.id, name: sh.title, count: 0}))
                    }}>주문하기
                    </button>
                </Col>
            </Row>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        setTab(0)
                    }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        setTab(1)
                    }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        setTab(2)
                    }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab} shoes={props.shoes}/>

        </Container>
    );
}

function TabContent({tab, shoes}) {
    let [fade, setFade] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setFade('end');
        }, 100)
        return () => {
            setFade('');
        }
    }, [tab])

    return (<div className={'start ' + fade}>
        {[
            <div>{shoes[0].title}</div>
            ,
            <div>내용1</div>
            ,
            <div>내용2</div>
        ][tab]}
    </div>)
}


export default Detail;