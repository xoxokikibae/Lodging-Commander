import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ChevronDown, ChevronUp } from 'lucide-react'

import './showList.css';

function ShowList() {
    const [faqs, setFaqs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    const [expandedFaq, setExpandedFaq] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('No token found, redirecting to login');
                navigate('/login');
                return;
            }
            try {
                const config = {
                    params: {page, pageSize},
                    headers: {'Authorization': `Bearer ${token}`}
                };

                const response = await axios.get('http://localhost:8080/faqBoard/faqAdmin/listFaqs', config );

                if (Array.isArray(response.data)) {
                    setFaqs(response.data.filter(faq => faq != null).sort((a, b) => a.id - b.id));
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Received unexpected data format from server.');
                }

            } catch (error) {
                console.error('Error fetching FAQs:', error);
                if (error.response && error.response.status === 401) {
                    setError('Failed to load FAQs. Please try again later.');
                    navigate('/login');
                } else {
                    setError('Failed to load FAQs. Please try again later.');
                }
            } finally {
                setIsLoading(false);
            }
        })();
    }, [page, pageSize, navigate]);

    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    }

    if (isLoading) return <div>Loading FAQs...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="faq-list-container">
            <h2 className="faq-list-heading"> 자주 묻는 질문 (FAQ) 리스트 </h2>
            {faqs.length === 0 ? (
                <p>No FAQs available.</p>
            ) : (
                <div className="faq-list">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="faq-item">
                            <div className="faq-header" onClick={() => toggleFaq(faq.id)}>
                                <div className="faq-icon">
                                    <span role="img" aria-label="FAQ icon"> ? </span>
                                </div>
                                <div className="faq-title">{faq.title}</div>
                                <div className="faq-expand-icon">
                                    {expandedFaq === faq.id ? <ChevronUp/> : <ChevronDown/>}
                                </div>
                            </div>
                            {expandedFaq === faq.id && (
                                <div className="faq-content">
                                    <p>{faq.content}</p>
                                    <div className="faq-actions">
                                        <Link to={`/faqBoard/faqDetails/ShowOne/${faq.id}`}>ShowOne</Link>
                                        <Link to={`/faqBoard/faqDetails/Modified/${faq.id}`}>Modified</Link>
                                        <Link to={`/faqBoard/faqDetails/Delete/${faq.id}`}>Delete</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
                <span> Page {page}</span>
                <button onClick={() => setPage(p => p + 1)} disabled={faqs.length < pageSize}>Next</button>
            </div>
        </div>
    );
}

export default ShowList;