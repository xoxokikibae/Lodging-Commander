import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import BookingCardItem from "../components/BookingCardItem";

const BookingList = () => {
    const [data, setData] = useState({bookingList: []});
    const onValidBooking = async () => {
        try {
            const response = await axios.get("http://localhost:8080/validBooking");
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (e) {
            console.error("valid booking list error", e);
        }
    }
    const onExpiredBooking = async () => {
        try {
            const response = await axios.get("http://localhost:8080/expiredBooking");
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (e) {
            console.error("expired booking list error", e);
        }
    }
    const onCancelBooking = async () => {
        try {
            const response = await axios.get("http://localhost:8080/cancelBooking");
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (e) {
            console.error("cancel booking list error", e);
        }
    }

    useEffect(() => {
        onValidBooking()
    }, []);

    return (
        <Container>
            <h1>BookingList 리스트 페이지 컴포넌트 (test)</h1>
            <hr/>
            <div>
                <h3 onClick={onValidBooking}>다가오는 예약</h3>
                <h3 onClick={onExpiredBooking}>만료된 예약</h3>
                <h3 onClick={onCancelBooking}>취소된 예약</h3>
                <hr/>
                <ul>
                    {data.bookingList.map((b) => (
                        <BookingCardItem booking={b} key={b.id}/>
                    ))}
                </ul>
            </div>
            <hr/>
        </Container>
    )
}

export default BookingList