import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Alert, Button, Card, Col, Container, Row, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

const NewList = (userInfo) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/hotel/newHotels', {withCredentials: true});
                setHotels(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching hotel details:', error);
                setError('호텔 정보를 불러오는 데 실패했습니다. 잠시후 다시 시도해 주세요');
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    const goHotelDetail = (id) => {
        navigate(`/hotel/details/${id}`, {
            state: {userData: userInfo},
        });
    };

    const showNextHotel = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % hotels.length);
    };

    const showPreviousHotel = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + hotels.length) % hotels.length);
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <Alert.Title>Error</Alert.Title>
                <Alert.Description>{error}</Alert.Description>
            </Alert>
        );
    }

    if (hotels.length === 0) {
        return (
            <Card className="max-w-md mx-auto mt-8">
                <Card.Header>
                    <Card.Title>이용 가능한 호텔이 없습니다</Card.Title>
                </Card.Header>
            </Card>
        );
    }

    const currentHotel = hotels[currentIndex];

    return (
        <Container className="mt-3">
            <Row className="justify-content-center">
                <Col className="justify-content-between align-items-center">
                    <Row>
                        <Col sm={8}>
                            <Card>
                                <Card className="justify-content-between">
                                    <Card.Header as="h5"
                                                 onClick={() => goHotelDetail(hotels[currentIndex].id)}> {hotels[currentIndex].name}
                                        style = {{cursor: 'pointer'}} > {currentHotel.name}
                                    </Card.Header>

                                    <Card.Body>
                                        <Card.Text className="mb-0">
                                            <span className="text-muted">전화번호:</span>
                                            <span className="text-primary">0{hotels[currentIndex].tel}</span>
                                        </Card.Text>
                                    </Card.Body>

                                    <Card.Footer className="d-flex justify-content-between">
                                        <Button
                                            variant="secondary"
                                            onClick={showPreviousHotel}
                                            disabled={hotels.length <= 1}
                                            className="flex-shrink-0"
                                        >
                                            이전
                                        </Button>

                                        <Button
                                            variant="primary"
                                            onClick={showNextHotel}
                                            disabled={hotels.length <= 1}
                                            className="flex-shrink-0">
                                            다음
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default NewList;