import React, {useState} from 'react';
import './Write.css';
import axios from 'axios';
import {Container, Button, Form} from "react-bootstrap";

import {useNavigate} from 'react-router-dom';

const categories = [
    {id: 1, title: "숙소", icon: "🏨"},
    {id: 2, title: "결제", icon: "💳"},
    {id: 3, title: "취소 및 환불", icon: "🔙"},
    {id: 4, title: "회원 정보", icon: "👤"},
];

function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/faqBoard/faqAdmin/Write/0',
                {title, content},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            alert('FAQ created successfully');
            setTitle('');
            setContent('');
            setCategory('');
            console.log('FAQ created successfully:', response.data);
            navigate('/faqBoard/faqAdmin/ShowList');
        } catch (error) {
                console.error('Error data:', error.response?.data || error.message);
                console.error('Error status:', error.response?.status);
                console.error('Error headers:', error.response?.headers);
            if (error.response?.status === 403) {
                alert('You do not have permission to create FAQs. Please log in as an admin.');
                navigate('/Auth');
            }
        }
    };

    return (
        <div className="faq-write-page">

            <Container className="faq-write-main-container" marginTop="5%">
                <h2 className="faq-admin-write-heading"> 새로운 자주 묻는 질문(FAQ) 등록 페이지 </h2>
                <Form className="faq-write-form" onSubmit={handleSubmit}>
                    <Form.Group controlId="formCategory">
                        <Form.Label>카테코리 선택</Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            >
                            <option value=""> 카테고리를 선택하세요.</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.title}>
                                    {cat.icon} {cat.title}
                                </option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                    <div className="faq-admin-write-content-margin"> </div>
                    <Form.Group controlId="formQuestion">
                        <Form.Label>
                            <h6 className="faq-admin-write-content"> 자주 묻는 질문 '제목' 등록란</h6>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="새롭게 등록할 자주 묻는 질문(FAQ)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="faq-admin-write-content-margin"> </div>
                    <Form.Group controlId="formAnswer">
                        <Form.Label>
                            <h6 className="faq-admin-write-content"> 위의 질문에 대한 답변란</h6>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="등록할 '자주 묻는 질문(FAQ)'를 입력하세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="faq-create-button" disabled={isLoading}>
                    {isLoading ? '자주 묻는 질문(FAQ) 새로 생성 중...' : '새로운 FAQ 질문 추가'}
                    </Button>
                    <div>
                    <Container className="faq-write-main-container">
                        <div className="header-links">
                            <a href="/faqBoard/faqAdmin" className="faq-nav-link-back">뒤로가기</a>
                        </div>
                    </Container>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default Write;