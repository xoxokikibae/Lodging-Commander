import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";

let ShowRoomList = () => {
    let navigate = useNavigate();

    // 4. setData 가 아래에서 받은 객체를 자동으로 data(0번 인덱스) 에 담습니다. 참고로 객체로 초기화 했습니다.
    let [data, setData] = useState({roomList: []});

    let onBooking = () => {
        navigate('/booking/');
    }

    // 1. useEffect 를 통해 app.js 의 Router 가 이 js 파일을 호출 시 내부 함수를 실행시킵니다.
    useEffect(() => {
        let roomList = async () => {
            // 2. axios 가 해당 URL 속 JSON 객체를 get 합니다.
            try {
                let response = await axios.get("http://localhost:8080/roomList")
                // 3. 객체의 상태가 정상이라면 axios 가 URL 에서 감지한 JSON 객체를 자동 대입 받습니다.
                if (response.status === 200) {
                    console.log(response);
                    setData(response.data);
                }
            } catch (error) {
                console.error("room list error: ", error);
            }
        }
        // roomList 함수가 곧바로 실행되도록 세팅
        roomList()
        console.log(data)
    }, []);

    // return
    return (
        <Container>
            <h1>Booking 기능 테스트 main redirection page</h1>
            <div>
                <h2>스프링에서 보내온 데이터입니다.</h2>
                <ul>
                    {/* 5. 위에서 저장해둔 JSON 객체를 컴포넌트의 양식에 맞춰 태그 형태로 출력합니다. */}
                    {data.roomList.map((r) => (
                        <ListRowComp room={r} key={r.id}/>
                    ))}
                </ul>
            </div>
            <button onClick={onBooking}>객실 상세 페이지로 이동</button>
        </Container>
    )
}

// 컴포넌트
let ListRowComp = ({room}) => {
    return (
        <li>
            <h3>{room.id}</h3>
            <h3>{room.name}</h3>
        </li>
    )
}

export default ShowRoomList