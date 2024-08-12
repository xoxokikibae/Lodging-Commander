import React, { useState } from 'react';
import axios from 'axios';

import './Write.css';

function Write() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/faqs',
                { title, content },
                {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
            });
            alert('FAQ created successfully');
            // Redirect or clear form
        } catch (error) {
            console.error('Error creating FAQ:', error);
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
            <button type="submit">Create FAQ</button>
        </form>
    );
}

export default Write;