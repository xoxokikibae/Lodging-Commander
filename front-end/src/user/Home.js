import React, {useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Col, Container, Row, Table} from "react-bootstrap";

const Home = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null);
    const [data] = useState({userDTO: {} });  // 초기 상태 설정

    const fetchUserData = useCallback(async () => {
        try {
            const response = await api.get('/user/info');
            setUserData(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            navigate('/Auth');
        }
    }, [navigate]);

    useEffect(() => {
        if (location.state && location.state.userData) {
            setUserData(location.state.userData);
        } else {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/Auth');
            } else {
                fetchUserData();
            }
        }
    }, [location, navigate, fetchUserData]);

    const onLogout = async () => {
        try {
            let response = await api.post('/user/logOutSuccess');

            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/')
            }
        } catch (error) {
            console.error('로그아웃 에러:', error);
        }
    };

    let goBack = () => {
        navigate(-1)
    }

    const goToUserPage = () => {
        navigate('/user/info', {state: {userData, data}});
    }

    const goToFaqAdminPage = () => {
        window.location.href = '/faqBoard/faqAdmin';
    }

    if (!userData) {
        return <div> Loading... </div>;
    }

    const {email, nickname, role} = userData;

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={13} sm={10} md={6} lg={5}>
                    <Table className={"text-center"} striped hover bordered>
                        <thead>
                        <tr>
                            <td><h3>사용자 정보</h3></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>이메일 : {email}</td>
                        </tr>
                        <tr>
                            <td>닉네임 : {nickname}</td>
                        </tr>
                        <tr>
                            <td>권한: {role}</td>
                        </tr>
                        <tr>
                            <td>
                                <ButtonGroup className="gap-3">
                                    <Button onClick={goBack}>뒤로가기</Button>
                                    <Button onClick={onLogout}>로그아웃</Button>
                                    <Button onClick={goToUserPage}>마이 페이지</Button>
                                    <Button onClick={goToFaqAdminPage}>자주 묻는 질문(FAQ) 관리</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;