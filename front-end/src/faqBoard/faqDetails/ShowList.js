import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './showList.css';

function ShowList() {
    const [faqs, setFaqs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:8080/api/faqs', {
                    params: { page, pageSize }
                });
                setFaqs(response.data);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
                setError('Failed to load FAQs. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        })();
    }, [page, pageSize]);

    if (isLoading) return <div>Loading FAQs...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>FAQ List</h1>
            {faqs.length === 0 ? (
                <p>No FAQs available.</p>
            ) : (
                <>
                    {faqs.map((faq) => (
                        <div key={faq.id} className="faq-item">
                            <h2>{faq.title}</h2>
                            <p>{faq.content}</p>
                            <div className="faq-actions">
                                <Link to={`/faqBoard/faqDetails/ShowOne/${faq.id}`}>View</Link>
                                <Link to={`/faqBoard/faqDetails/Update/${faq.id}`}>Edit</Link>
                                <Link to={`/faqBoard/faqDetails/Delete/${faq.id}`}>Delete</Link>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
                        <span>Page {page}</span>
                        <button onClick={() => setPage(p => p + 1)} disabled={faqs.length < pageSize}>Next</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ShowList;
