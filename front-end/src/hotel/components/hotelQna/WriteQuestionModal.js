import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const WriteQuestionModal = ({ isOpen, onClose, hotelId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/question/add`, {
                hotelId,
                title,
                content,
                userId: getCurrentUserId(), // Implement this function to get the current user's ID
                isAnswered: false
            });
            console.log('Question added:', response.data);
            onClose();
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>숙소 Q&A 작성하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>제목</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        제출
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default WriteQuestionModal;