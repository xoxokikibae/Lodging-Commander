import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Container, Tab, Tabs, Pagination, Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import './HotelQna.css';

function HotelQna({ qnaData }) {
    const location = useLocation();

    const [questions, setQuestions] = useState(qnaData || []);
    const [activeTab, setActiveTab] = useState('all');
    const [filters, setFilters] = useState({ category: 'all', answeredStatus: 'all' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showMyQuestions, setShowMyQuestions] = useState(false);
    const [error, setError] = useState(null);

    const {hotelId, hotelName} = location.state || {};

    const fetchQuestions = useCallback(() => {
        setIsLoading(true);
        axios.get(`/question/page`, {
            params: {
                hotelId,
                ...filters,
                page: currentPage - 1,
                size: 10,
                isAnswered: filters.answeredStatus === 'answeredStatus',
                userId: showMyQuestions ? getCurrentUserId() : undefined
            }
        }).then(response => {
            setQuestions(response.data.content);
            setTotalPages(response.data.totalPages);
            setError(null);
        }).catch(error => {
            console.error('질문을 불러오는데 에러가 발생했습니다:', error);
            setError('질문을 불러오는데 문제가 발생했습니다. 다시 시도해 주세요.');
        }).finally(() => {
            setIsLoading(false);
        });
    }, [hotelId, filters, currentPage, showMyQuestions]);

    useEffect(() => {
        if (hotelId) {
            fetchQuestions();
        }
    }, [hotelId, fetchQuestions]);

    // const handleSubmitAnswer = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await axios.post(`/hotel/details/${hotelId}`, {
    //             hotelAnswerContent: event.target.answer.value,
    //             userId: getCurrentUserId()
    //         });
    //         event.target.reset();
    //         fetchQuestions();
    //     } catch (error) {
    //         console.error('Error submitting answer:', error);
    //         setError('답변 제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
    //     }
    // };

    const handleWriteQuestion = () => {
        setIsModalOpen(true);
    };

    const handleViewMyQuestions = () => {
        setShowMyQuestions(true);
        setActiveTab('myQuestion');
        setCurrentPage(1);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchQuestions();
    };

    const QuestionList = ({ questions, isLoading }) => {
        if (isLoading) {
            return <p>로딩 중...</p>;
        }

        if (questions.length === 0) {
            return <p>현재 등록된 질문이 없습니다. </p>;
        }
        return (
            <div className="question-list">
                {questions.map(question => (
                    <QuestionItem key={question.id} question={question} />
                ))}
            </div>
        );
    }

    const QuestionItem = ({ question }) => {
        const [isExpanded, setIsExpanded] = useState(false);

        return (
            <div className="question-item">
                <h3 onClick={() => setIsExpanded(!isExpanded)}>{question.title}</h3>
                <div className="question-inner">
                    <span>{question.user.nickname}</span>
                    <span>{formatDate(question.uploadDateTime)}</span>
                </div>
                {isExpanded && (
                    <>
                        <p>{question.content}</p>
                        <div className="answers">
                            {question.answer.map(answer => (
                                <AnswerItem key={answer.id} answer={answer} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }

    const AnswerItem = ({ answer }) => {
        return (
            <div className="answer-item">
                <p>{answer.Content}</p>
                <div className="answer-inner">
                    <span>{answer.user.nickname} '유저 닉네임' </span>
                    <span>{formatDate(answer.uploadDateTime)}</span>
                </div>
                <VoteButton answerId={answer.id} votes={answer.votes} />
            </div>
        );
    }

    const VoteButton = ({ answerId, initialVotes }) => {
        const [votes, setVotes] = useState(initialVotes);

        const handleVote = async () => {
            try {
                await axios.post(`http://localhost:8080/hotel/answers/${answerId}/vote`);
                setVotes(prevVotes => prevVotes + 1);
            } catch (error) {
                console.error('Error voting for answer:', error);
                setError('투표 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        };

        return (
            <Button variant="outline-primary" size="sm" onClick={handleVote}>
                좋아요 ({votes})
            </Button>
        );
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getCurrentUserId = () => {
        return 1; // This should be replaced with actual user authentication
    };

    const AskQuestionForm = ({ onClose }) => {
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.post(`http://localhost:8080/hotel/${hotelId}/questions`, {
                    title,
                    content,
                    userId: getCurrentUserId(),
                    isPublic: true
                });
                onClose();
                fetchQuestions();
            } catch (error) {
                console.error('Error submitting question:', error);
                setError('질문 제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        };

        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="질문 제목"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="질문 내용"
                        required
                    />
                </Form.Group>
                <Button type="submit">질문 제출</Button>
            </Form>
        );
    };

    return (
        <Container className="qna-container">
            <div className="hotel-qna-system">
                <h2 className="hotel-qna-title">숙소: {hotelName}에 관하여 질문 (Q&A)</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <div className="d-flex justify-content-between mb-3">
                    <Button className="qna-view-all-button" onClick={handleViewMyQuestions}>나의 Q&A 조회</Button>
                    <Button className="qna-write-button" onClick={handleWriteQuestion}>숙소 Q&A 작성하기</Button>
                </div>

                <QnaStats questions={questions} />
                <QnaFilters filters={filters} setFilters={setFilters} />

                {isLoading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="active-tab-style mt-3"
                    >
                        <Tab eventKey="all" title="모든 질문 보기">
                            <QuestionList questions={questions} isLoading={isLoading} />
                        </Tab>
                        <Tab eventKey="myQuestion" title="내 질문 보기">
                            <QuestionList
                                questions={questions.filter(q => q.userId === getCurrentUserId())}
                                isLoading={isLoading}
                            />
                        </Tab>
                    </Tabs>
                )}

                {!isLoading && (
                    <Pagination className="active-page mt-3">
                        <Pagination.Prev
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        />
                        <Pagination.Item>{currentPage}</Pagination.Item>
                        <Pagination.Next
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                )}

                <Modal show={isModalOpen} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>새로운 질문 작성 하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AskQuestionForm
                            hotelId={hotelId}
                            onClose={handleCloseModal}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        </Container>
    );
}

const QnaStats = ({ questions }) => {
    return (
        <div className="qna-stats">
            <span>총 {questions.length}개의 질문</span>
        </div>
    );
}

const QnaFilters = ({ filters, setFilters }) => {
    return (
        <div className="qna-filters">
            <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                <option value="all">모든 카테고리</option>
                <option value="room">객실</option>
                <option value="facility">시설</option>
                <option value="service">서비스</option>
            </select>
            <select
                value={filters.answeredStatus}
                onChange={(e) => setFilters({ ...filters, answeredStatus: e.target.value })}>
                <option value="all">모든 상태</option>
                <option value="answeredStatus">답변 완료</option>
                <option value="unansweredStatus">미답변</option>
            </select>
        </div>
    )
};

export default HotelQna;