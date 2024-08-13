import {Card} from "react-bootstrap";

const BookingCardItem = ({ booking }) => {
    return (
        <li className={'mb-3'}>
            <Card>
                <Card.Body style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Card.Img src={booking.imgPath} style={{ objectFit: "cover", width: "100px", height: "100px" }} />
                    <div>
                        <Card.Title>{booking.roomName}</Card.Title>
                        <p>체크인: {booking.checkInDate}</p>
                        <p>체크아웃: {booking.checkOutDate}</p>
                    </div>
                    <div>
                        <p>예약 인원 수: {booking.totalPeople}</p>
                        <p>총 결제 금액{booking.totalPrice}</p>
                    </div>
                    <div>
                        <p>예약 취소 여부: {booking.cancel ? "Yes" : "No"}</p>
                    </div>
                </Card.Body>
            </Card>
        </li>
    )
}

export default BookingCardItem;
