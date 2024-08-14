import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const AddressForm2 = () => {
    const [address, setAddress] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [postCode, setPostCode] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = location.state?.userData;

    useEffect(() => {
        const loadDaumPostcodeScript = () => {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.async = true;
            document.body.appendChild(script);
            script.onload = () => {
                if (window.daum && window.daum.Postcode) {
                    window.daum.Postcode({
                        oncomplete: function (data) {
                            const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                            let extraAddr = '';

                            if (data.userSelectedType === 'R') {
                                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                                    extraAddr += data.bname;
                                }
                                if (data.buildingName !== '' && data.apartment === 'Y') {
                                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                                }
                                if (extraAddr !== '') {
                                    extraAddr = ' (' + extraAddr + ')';
                                }
                            } else {
                                extraAddr = '';
                            }

                            setPostCode(data.zonecode);
                            setAddress(addr);
                            setExtraAddress(extraAddr);
                            setAddressDetail('');
                            document.getElementById('addressDetail').focus();
                        }
                    });
                }
            };
        };

        loadDaumPostcodeScript();
    }, []);

    const handlePostcodeSearch = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                    let extraAddr = '';

                    if (data.userSelectedType === 'R') {
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        if (extraAddr !== '') {
                            extraAddr = ' (' + extraAddr + ')';
                        }
                    } else {
                        extraAddr = '';
                    }

                    setPostCode(data.zonecode);
                    setAddress(addr);
                    setExtraAddress(extraAddr);
                    setAddressDetail('');
                    document.getElementById('addressDetail').focus();
                }
            }).open();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                address,
                addressDetail,
                postCode,
                extraAddress,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            };
            const response = await axios.post(`http://localhost:8080/properties/address`, data, {
                withCredentials: true
            });
            const addressId = response.data.addressId;
            navigate(`/CategoryForm?addressId=${addressId}`, {
                state: {
                    addressId: addressId,
                    userData: userInfo
                }
            });

        } catch (error) {
            setError('Error saving address');
            console.error('Error saving address', error);
        }
    };

    return (
        <Container className="mt-4">
            <h4>1/5 단계</h4>
            <h2>기본 정보 등록부터 시작해 보겠습니다</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} style={{ marginTop: '5%' }}>
                <Form.Group as={Row} className="mb-3" controlId="formPostCode">
                    <Form.Label column sm={2}>우편번호</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={postCode}
                            placeholder="우편번호"
                            readOnly
                        />
                        <Button variant="primary" type="button" onClick={handlePostcodeSearch} className="mt-2">
                            우편번호 찾기
                        </Button>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formAddress">
                    <Form.Label column sm={2}>주소</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={address}
                            placeholder="주소"
                            readOnly
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="addressDetail">
                    <Form.Label column sm={2}>상세 주소</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={addressDetail}
                            onChange={(e) => setAddressDetail(e.target.value)}
                            placeholder="상세 주소"
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formExtraAddress">
                    <Form.Label column sm={2}>참고항목</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={extraAddress}
                            placeholder="참고항목"
                            readOnly
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formLatitude">
                    <Form.Label column sm={2}>위도</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            step="any"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            placeholder="위도"
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formLongitude">
                    <Form.Label column sm={2}>경도</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            step="any"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            placeholder="경도"
                            required
                        />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                    다음
                </Button>
            </Form>
        </Container>
    );
};

export default AddressForm2;
