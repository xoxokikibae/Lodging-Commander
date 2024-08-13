import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";

const RoomList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({roomList: []});

    const userInfo = { // userInfo 임시 테스트 값
        id: 1,
        role: "USER",
        grade: "Silver",
        email: "ABC@gmail.com",
    }
    const searchFromData = { // 청하님 메인 form 테스트 값
        checkInDate: "2024-10-25",
        checkOutDate: "2024-10-30",
    }

    const moveToBooking = (id) => {
        navigate('/booking/' + id, {
            state: {
                userInfo: userInfo,
                searchFromData: searchFromData,
            }
        });
    }

    useEffect(() => {
        const roomList = async () => {
            try {
                const response = await axios.get("http://localhost:8080/roomList")
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (e) {
                console.error("room list error", e);
            }
        }
        roomList()
    }, []);

    return (
        <Container>
            <h1>Hotel 페이지 Room 리스트 영역</h1>
            <hr/>
            <div>
                <ul>
                    {data.roomList.map((r) => (
                        <ListRowComp room={r} key={r.id} moveToBooking={moveToBooking}/>
                    ))}
                </ul>
            </div>
            <hr/>
        </Container>
    )
}

let ListRowComp = ({room, moveToBooking}) => {
    return (
        <li onClick={() => moveToBooking(room.id)}>
            <span>방 이름: {room.roomName}</span>
            |
            <span>1박 당: {room.oneDayPrice}원</span>
            |
            <span>남은 방: {room.quantity}개</span>
        </li>
    )
}

export default RoomList