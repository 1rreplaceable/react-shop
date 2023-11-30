import {Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

function Detail(props) {

    let {id} = useParams();
    let sh = props.shoes.find((x) => {
        return x.id == id

    })

    return (
        <Container>
            <Row>
                <Col>
                    <img src={`https://codingapple1.github.io/shop/shoes${sh.id + 1}.jpg`} width="80%"/>
                    <h4 className="pt-5">{sh.title}</h4>
                    <p>{sh.content}</p>
                    <p>{sh.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </Col>
            </Row>
        </Container>
    );
}

export default Detail;