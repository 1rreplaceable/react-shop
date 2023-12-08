import {Table} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {changeName, changeAge} from "../store/userSlice";
import {addCount} from "../store";
import {memo, useMemo, useState} from "react";

// memo, useMemo

function Cart() {


    let state = useSelector((state) => {
        return state
    })
    // store.js에 요청
    let dispatch = useDispatch()
    let [count, setCount] = useState(0)


    return (
        <div>
            {state.user.name}의 장바구니
            <br/>
            {state.user.age}
            <button onClick={() => {
                dispatch(changeAge(10))
            }}>버튼
            </button>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                {state.cart.map((item, index) => (<tr key={index}>
                    <td>{state.cart[index].id}</td>
                    <td>{state.cart[index].name}</td>
                    <td>{state.cart[index].count}</td>
                    <td>
                        <button onClick={() => {
                            dispatch(addCount(state.cart[index].id));
                        }}>+
                        </button>
                    </td>
                </tr>))}
                </tbody>
            </Table>
        </div>
    )
}


export default Cart