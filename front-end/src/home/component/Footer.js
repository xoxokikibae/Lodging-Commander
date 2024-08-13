import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="mt-5 bg-light py-4">
            <Container>
                <Row>
                    <Col md={3}>
                        <h5>인기 도시</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/city/seoul">서울 호텔</Link></li>
                            <li><Link to="/city/busan">부산 호텔</Link></li>
                            <li><Link to="/city/jeju">제주 호텔</Link></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5>인기 국가 및 지역</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/country/korea">한국 호텔</Link></li>
                            <li><Link to="/country/japan">일본 호텔</Link></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5>지원 및 자주 묻는 질문</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/support/faq">자주 묻는 질문(FAQ)</Link></li>
                            <li><Link to="/support/contact">고객지원</Link></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5>기타 정보</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/info/privacy">개인정보 처리방침</Link></li>
                            <li><Link to="/info/terms">이용약관</Link></li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <p className="text-muted small">
                            © 2024 Lodgingcommander.com은 Bootcamp 계열사입니다. All rights reserved.
                            Lodgingcommander.com 및 Lodgingcommander.com 로고는 한국 및/또는 다른 국가에서 Lodgingcommander.com, LP의 상표 또는 등록 상표입니다. 기타 로고 상표는 해당 소유자의 재산입니다.
                        </p>
                        <p className="text-muted small">
                            주소: 서울특별시 서초구 서초대로74길 33, 4층, Tel: 02-0000-0000, Mail: CS-KR@support.Lodgingcommander.com
                            통신판매업신고번호:서초-0042호 사업자등록번호: 000-00-0000 대표이사: Commander 관광사업자 등록번호:제2024-000815호 서울특별시비트협회
                            호스팔리티사업자 회원번호:0000
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;