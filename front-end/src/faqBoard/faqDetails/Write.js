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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="FAQ Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="FAQ Content"
            />
            {isLoading && <p> Creating FAQ...</p>}
            {error && <p className="error"> Error: {error} </p>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create FAQ'}
            </button>
        </form>
    );
}

export default Write;