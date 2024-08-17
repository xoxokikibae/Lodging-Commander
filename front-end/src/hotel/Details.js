import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomList from "../room/RoomList";
import HotelFacility from "./components/HotelFacility";
import {getTodayDate} from "../js/day";
import {Form, Alert, Card, Carousel, Col, Container, FloatingLabel, ListGroup,
    Row, Spinner, Table, Button} from "react-bootstrap";

import Kakao from "./components/Kakao";

const HotelQnaHeading = {
    fontFamily: 'Josefin Sans, Nanum Gothic',
    fontSize: '2rem',
    fontWeight: '400',
    fontStyle: 'normal',
    fontOpticalSizing: 'auto',
    marginTop: '2rem',
    marginBottom: '2rem',
    justifyContent: 'center'
}

const HotelQnaHeading2 = {
    fontFamily: 'Josefin Sans, Nanum Gothic',
    fontSize: '3rem',
    fontWeight: '400',
    fontStyle: 'normal',
    fontOpticalSizing: 'auto',
    marginTop: '2rem',
    marginBottom: '2rem',
    justifyContent: 'center'
}

const Details = () => {
    const getNextDate = (date) => {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toISOString().split('T')[0];
    };
    const location = useLocation();
    const userInfo = location.state?.userData || null;
    const initialCheckInDate = location.state?.checkInDate || getTodayDate();
    const initialCheckOutDate = location.state?.checkOutDate || getNextDate(getTodayDate());

    const [checkInDate, setCheckInDate] = useState(initialCheckInDate);
    const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate);
    let {id} = useParams();
    let [hotel, setHotel] = useState({hotel: {}});
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //QNA by jeongyeon
    const [qnaList, setQnaList] = useState([]);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/hotel/details/${id}`, {withCredentials: true});
                setHotel(response.data.hotel);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching hotel details:', error);
            }
        };
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/review/hotel/${id}`, {withCredentials: true});
                if (response.status === 200) {
                    setReviews(response.data.reviews || []);
                } else {
                    throw new Error('서버 오류');
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('리뷰를 가져오는 데 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        const fetchQnA = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/hotel/details/${id}`, {withCredentials: true});
                setQnaList(response.data);
            } catch (error) {
                console.error('Error fetching QnA:', error);
            }
        }

        if (id) {
            fetchHotelDetails();
            fetchReviews();
            fetchQnA();
        }

    }, [id]);

    const isFormValid = checkInDate && checkOutDate && new Date(checkInDate) <= new Date(checkOutDate);

    if (!hotel) return <div>Loading...</div>;
    if (loading) return <Spinner animation="border" variant="primary"/>;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!hotel) return <div>Loading...</div>;


    return (
        <Container className="mt-5">
            <Row>
                <Col md={7}>
                    <Carousel>
                        {hotel.imgPath && hotel.imgPath.map((url, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={url}
                                    alt={`Slide ${index}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                <Col md={5}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{hotel.hotelName}</Card.Title>
                            <Card.Text>
                                체크인: {checkInDate} 체크아웃: {checkOutDate}
                            </Card.Text>
                            <Card.Text>
                                <strong>₩ {new Intl.NumberFormat().format(hotel.minPrice)}</strong> (1박당 최저가격)
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col md={12}>
                    <h3>호텔 설명</h3>
                    <p>{hotel.detail}</p>
                </Col>
                <Col>
                    <Kakao id={id}/>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={12}>
                    <h4>호텔 편의 시설</h4>
                    <ul>
                        <HotelFacility amenities={hotel.facilities}/>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col sm={9}>
                    <Row className={"mb-3"}>
                        <h3>객실 선택</h3>
                    </Row>
                    <Row>
                        <Col xs="auto">
                            <FloatingLabel label="체크인 날짜" controlId="checkInDate" className="mb-3">
                                <Form.Control
                                    type="date"
                                    value={checkInDate}
                                    min={getTodayDate()}
                                    onChange={(e) => {
                                        setCheckInDate(e.target.value);
                                        if (new Date(e.target.value) > new Date(checkOutDate)) {
                                            setCheckOutDate(e.target.value);
                                        }
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs="auto">
                            <FloatingLabel label="체크아웃 날짜" controlId="checkOutDate" className="mb-3">
                                <Form.Control
                                    type="date"
                                    value={checkOutDate}
                                    min={getNextDate(checkInDate)}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Col>
                <Col sm={9}>
                    <Row className="mt-3">
                        <RoomList userInfo={userInfo} checkInDate={checkInDate} checkOutDate={checkOutDate}
                                  hotelId={hotel.id}/>
                    </Row>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h4>호텔 리뷰</h4>
                    {reviews.length === 0 ? (
                        <Alert variant="info">작성된 리뷰가 없습니다.</Alert>
                    ) : (
                        <ListGroup>
                            {reviews.map((review) => (
                                <ListGroup.Item key={review.id}>
                                    <h5>작성자: {review.userName}</h5>
                                    <p>{review.content}</p>
                                    <p><strong>평점:</strong> {review.rating}</p>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                    <Row className="mt-5">
                        <Col>
                            <h2 style={HotelQnaHeading}>Q&A</h2>
                            <h3 style={HotelQnaHeading2}>예약을 확정하고자하는 숙소에 대해 궁금한 점이 있으신 경우 문의해주세요.</h3>
                            <div className="d-flex justify-content-between mb-3">
                                <Button variant="dark">숙소 Q&A 작성하기</Button>
                                <Button variant="outline-secondary">나의 Q&A 조회</Button>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>답변상태</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>작성일</th>
                                </tr>
                                </thead>
                                <tbody>
                                {qnaList.map((qna, index) => (
                                    <tr key={index}>
                                        <td>{qna.answerId}</td>
                                        <td>{qna.title}</td>
                                        <td>{qna.author}</td>
                                        <td>{qna.uploadDateTime}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-center mt-3">
                                <Button variant="primary">1</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Details;