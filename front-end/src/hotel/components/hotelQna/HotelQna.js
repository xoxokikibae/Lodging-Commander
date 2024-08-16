import React, {useEffect, useState} from 'react';
import {Pagination} from "react-bootstrap";

export function HotelQnaSystem({ hotelId }) {
    const [questions, setQuestions] = useState([]);
    const [filters, setFilters] = useState({ category: 'all', answeredStatus: 'all' });

    useEffect(() => {
        setIsLoading(true);
        fetchQuestions(hotelId,filters)
            .then(data => {
                setQuestions(data)
                setIsLoading(false);
            })
            .catch(error => {
                console.log('Error fetching question:',error)
                setIsLoading(false);
            });
    }, [hotelId, filters]);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        fetchQuestions(hotelId, filters)
            .then(data => {
                setQuestions(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
                setIsLoading(false);
            });
    }, [hotelId, filters]);

    return (
        <div className="hotel-qna-system">
            <h2>HOTEL Q&A</h2>
            <QnaStats questions={questions} />
            <QnaFilters filters={filters} setFilters={setFilters} />
            <AskQuestionButton hotelId={hotelId} />
            {isLoading ? <p>로딩 중...</p> : <QuestionList questions={questions} />}
            <Pagination />
        </div>
    );
}

function QnaStats({ questions }) {
    return (
        <div className="qna-stats">
            <span>총 {questions.length}개의 질문</span>
        </div>
    );
}

function QnaFilters({ filters, setFilters }) {
    // Implement category and answered status filters
    return (
        <div className="qna-filters">
            <select
                value={filters.category}
                onChange={(e) => setFilters({...filters,category: e.target.value})}>
                <option value="all">모든 카테고리</option>
                <option value="room">객실</option>
                <option value="facility">시설</option>
                <option value="service">서비스</option>
            </select>
            <select value={filters.answeredStatus}>
                onChange={(e) => setFilters({...filters,answeredStatus: e.target.value})}>
                <option value="all">모든 상태</option>
                <option value="answeredStatus">답변 완료</option>
                <option value="unansweredStatus">미답변</option>
            </select>
        </div>
    )
}

function AskQuestionButton({ hotelId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>문의하기</button>
            {isModalOpen && <AskQuestionModal hotelId={hotelId} onClose={() => setIsModalOpen(false)} />}
        </>
    );
}

function QuestionList({ questions }) {
    return (
        <div className="question-list">
            {questions.map(question => (
                <QuestionItem key={question.id} question={question} />
            ))}
        </div>
    );
}

function QuestionItem({ question }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="question-item">
            <h3 onClick={() => setIsExpanded(!isExpanded)}>{question.questionContent}</h3>
            <div className="question-meta">
                <span>{question.questionerName}</span>
                <span>{formatDate(question.questionDate)}</span>
            </div>
            {isExpanded && (
                <div className="answers">
                    {question.answers.map(answer => (
                        <AnswerItem key={answer.id} answer={answer} />
                    ))}
                    {question.isAnswered ? null : <AnswerForm questionId={question.id} />}
                </div>
            )}
        </div>
    );
}

function AnswerItem({ answer }) {
    return (
        <div className="answer-item">
            <p>{answer.answerContent}</p>
            <div className="answer-meta">
                <span>{answer.responderName} ({answer.responderType})</span>
                <span>{formatDate(answer.answerDate)}</span>
            </div>
            <VoteButton answerId={answer.id} votes={answer.helpfulVotes} />
        </div>
    );
}

function AnswerForm({ questionId }) {
    // Implement form for answering a question
    return (
        <form className="answer-from">

        </form>
    )
}

function VoteButton({ answerId, votes }) {
    // Implement voting functionality
    return (
        <button className="vote-button">
            좋아요 ({votes}
        </button>
    )
}

function Pagination() {
    // Implement pagination logic
    return (
        <div className="pagination">
            {/* Add pagination controls here */}
        </div>
    );
}

function AskQuestionModal({ hotelId, onClose }) {
    // Implement modal for asking questions
    return (
        <div className="modal">
            <h2>새 질문 작성</h2>
            {/* Add form fields here */}
            <button onClick={onClose}>닫기</button>
        </div>
    );
}

function calculateAnswerRate(questions) {
    const answeredQuestions = questions.filter(q => q.isAnswered).length;
    return questions.length > 0 ? (answeredQuestions / questions.length * 100).toFixed(2) : 0;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// This function needs to be implemented to fetch data from your API
async function fetchQuestions(hotelId, filters) {
    // Implement API call here
    // For now, return an empty array
    return [];
}