import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const footerStyle = {
    backgroundColor: '#05156b',
    color: '#ffffff',
    padding: '2rem 0',
    fontFamily: 'Josefin Sans, Jua',
    fontOpticalSizing: 'auto',
    fontStyle: 'normal',
    fontWeight: '400',
};

const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
};

const headingStyle = {
    color:'#acc1fc',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    fontFamily:'New Amsterdam',
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
};

const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '2rem',
};

const linkStyle = {
    color: '#7887d6',
    textDecoration: 'none',
    marginBottom: '0.5rem',
};

const bottomStyle1 = {
    fontSize: '0.8rem',
    color: '#aab7fa',
    marginTop: '3rem',
    marginBottom: '3rem',
    textAlign: 'center',
};

const bottomStyle2 = {
    fontSize: '0.6rem',
    color: '#cfe5ff',
    marginTop: '0rem',
    marginBottom: '0.1rem',
    marginLeft: '1rem',
    textAlign: 'left',
}

const mainContentStyle = {
    fontFamily: 'Josefin Sans',
    fontWeight: 'weight',
    fontStyle : 'normal',
    textAlign: 'left',
    color : '#75b1fa',
    fontOpticalSizing : 'auto',
    marginBottom : '2rem',
}

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <h2 style={headingStyle}>⚓️ Lodging Commander </h2>
                <p style={mainContentStyle}>Lodging Commander is your go-to platform for finding the perfect and special accommodation. </p>

                <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    <div style={columnStyle}>
                        <h6>인기 도시</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/city/seoul" style={linkStyle}>서울 호텔</Link></li>
                            <li><Link to="/city/busan" style={linkStyle}>부산 호텔</Link></li>
                            <li><Link to="/city/jeju" style={linkStyle}>제주 호텔</Link></li>
                        </ul>
                    </div>

                    <div style={columnStyle}>
                        <h6>인기 국가 및 지역</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/country/korea" style={linkStyle}>한국 호텔</Link></li>
                            <li><Link to="/country/japan" style={linkStyle}>일본 호텔</Link></li>
                        </ul>
                    </div>
                    <div style={columnStyle}>
                        <h6>지원 및 자주 묻는 질문</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/faqBoard/faqMain" style={linkStyle}>자주 묻는 질문(FAQ)</Link></li>
                            <li><Link to="/support/contact" style={linkStyle}>고객지원</Link></li>
                        </ul>
                    </div>
                    <div style={columnStyle}>
                        <h6>기타 정보</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/info/LodgingCommander" style={linkStyle}>About LodgingCommander</Link></li>
                            <li><Link to="/info/privacy" style={linkStyle}>개인정보 처리방침</Link></li>
                            <li><Link to="/info/terms" style={linkStyle}>이용약관</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <Row>
                <p style={bottomStyle1}>
                    <div> © 2024 Lodgingcommander.com은 Bootcamp 계열사입니다. All rights reserved.</div>
                    <div> Lodgingcommander.com 및 Lodgingcommander.com 로고는 한국 및/또는 다른 국가에서 Lodgingcommander.com, LP의
                        상표
                        또는 등록 상표입니다. 기타 로고 상표는 해당 소유자의 재산입니다.
                    </div>
                </p>

                <p style={bottomStyle2}>
                    <div> 주소: 서울특별시 서초구 서초대로74길 33, 4층, Tel: 02-0000-0000</div>
                    <div> Mail: CS-KR@support.Lodgingcommander.com</div>
                    <div> 통신판매업신고번호:서초-0042호 사업자등록번호: 000-00-0000 대표이사: Commander</div>
                    <div> 관광사업자 등록번호:제2024-000815호 서울특별시비트협회
                        호스팔리티사업자 회원번호:0000
                    </div>
                </p>
            </Row>
        </footer>
    )
        ;
};

export default Footer;