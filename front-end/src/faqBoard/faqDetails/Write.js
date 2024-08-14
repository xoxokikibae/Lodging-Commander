import React, {useState} from 'react';
import './Write.css';

import axios from 'axios';

function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8080/api/upload/0',
                {
                    'title': title,
                    'content': content
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            alert('FAQ created successfully');
            setTitle('');
            setContent('');
            // Redirect or clear form

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            alert(`Error creating FAQ: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="faq-admin-write-container">
            <h2 className="faq-admin-write-heading"> 새로운 자주 묻는 질문(FAQ) 등록 페이지 </h2>

            <div>
                <form onSubmit={handleSubmit} className='faq-admin-write-form'>
                    <input
                        type="text"
                        placeholder="새롭게 등록할 '자주 묻는 질문(FAQ)'를 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="faq-admin-write-title"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="해당 '자주 묻는 질문(FAQ)'에 대한 답변을 입력하세요"
                        className="faq-admin-write-content"
                    />
                    {isLoading && <p> Creating FAQ...</p>}
                    {error && <p className="error"> Error: {error} </p>}

                    <button type="submit" className="faq-admin-write-button" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create FAQ'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Write;