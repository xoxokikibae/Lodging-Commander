import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Tab, Tabs, Pagination, Button, Modal, Form } from "react-bootstrap";
import './HotelQna.css';

const HotelQna = ({ hotelId, hotelName }) => {
    const [questions, setQuestions] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    const [filters, setFilters] = useState({ category: 'all', answeredStatus: 'all' });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/hotel/details/${hotelId}/questions`, {
                    params: { ...filters, totalPages: currentPage, tab: activeTab }
                });
                setQuestions(response.data.questions);
                setTotalPages(response.data.totalPages);

                setIsLoading(false);
            } catch (error) {
                console.error('질문을 불러오는데 에러가 발생했습니다:', error);
                setIsLoading(false);
            }
            return (fetchQuestions);
        };
    }, [hotelId, filters, currentPage, activeTab]);

    if (isLoading) return <div> Loading Q&As... </div>;

    return (
        <Container className="qna-contatiner">
            <div className="hotel-qna-system">
                <h2> 숙소에 관해 질문하기 Q&A</h2>
                <p> 숙소:{hotelName}에 관하여 질문 (Q&A) </p>

                {questions.map((qna,index) => (
                    <div key={index} className="qa-qna">
                        <h3> 질문: {qna.question} </h3>
                        <h3> 답변: {qna.answer} </h3>
                    </div>
                ))}
                <p> Q&A for hotel Name: {hotelName} </p>
                <QnaStats questions={questions} />
                <QnaFilters filters={filters} setFilters={setFilters} />
                <Button onClick={() => setIsModalOpen(true)}>문의하기</Button>
            </div>
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="active-tab-style mt-3"
            >
                <Tab eventKey="all" title="모든 질문 보기">
                    <QuestionList questions={questions} isLoading={isLoading} />
                </Tab>
                <Tab eventKey="myQuestion" title="내 질문 보기">
                    <QuestionList questions={questions.filter(q => q.userId === getCurrentUserId())} isLoading={isLoading} />
                </Tab>
            </Tabs>

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
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>새로운 질문 작성 하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AskQuestionForm hotelId={hotelId} onClose={() => setIsModalOpen(false)} />
                </Modal.Body>
            </Modal>
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
                onChange={(e) => setFilters({...filters, category: e.target.value})}>
                <option value="all">모든 카테고리</option>
                <option value="room">객실</option>
                <option value="facility">시설</option>
                <option value="service">서비스</option>
            </select>
            <select
                value={filters.answeredStatus}
                onChange={(e) => setFilters({...filters, answeredStatus: e.target.value})}>
                <option value="all">모든 상태</option>
                <option value="answeredStatus">답변 완료</option>
                <option value="unansweredStatus">미답변</option>
            </select>
        </div>
    )
}

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
            <VoteButton answerId={answer.id} votes={answer.answer.votes} />
        </div>
    );
}

const AnswerForm = ({questionId}) => {
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:8080/hotel/questions/${questionId}/answers`, {
                hotelAnswerContent: answer,
                userId: getCurrentUserId() // Assume this function exists to get the current user's ID
            });
            setAnswer('');
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="form-group row">
                <inpul class="Form-Control"
                       type="text"
                       as="textarea"
                       rows={3}
                       value={answer}
                       onChange={(event) => setAnswer(event.target.value)}
                       placeholder=".form-conrol-lg"
                />
            </div>

            <Button type="submit" class="btn btn-primary">해당 질문에 대한 답변을 제출합니다.</Button>
        </Form>
    );
};

const VoteButton = ({ answerId, initialVotes }) => {
    const [votes, setVotes] = useState(initialVotes);

    const handleVote = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/hotel/answers/${answerId}/vote`);
            setVotes(prevVotes => prevVotes + 1);
        } catch (error) {
            console.error('Error voting for answer:', error);
        }
    };

    return (
        <Button variant="outline-primary" size="sm" onClick={handleVote}>
            좋아요 ({votes})
        </Button>
    );
};

const AskQuestionForm = ({ hotelId, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/hotel/${hotelId}/questions`, {
                title,
                content,
                userId: getCurrentUserId(), // Assume this function exists to get the current user's ID
                isPublic: true // You might want to add a checkbox for this in the form
            });
            onClose();
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className= "form.group row">
                <input className = "form-control"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="질문 제목"
                    required
                />
            </div>
            <div className = "form.group row">
                <input className = "form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="질문 내용"
                    required
                />
            </div>
            <Button type="submit">질문 제출</Button>
        </Form>
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
    return 1;
};

export default HotelQna;