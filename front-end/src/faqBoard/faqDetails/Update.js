import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Update.css';

function Update() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaq = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/faqs/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error('Error fetching FAQ:', error);
            }
        };

        // Call the async function and handle the promise directly
        fetchFaq().catch(error => console.error('Error in useEffect fetchFaq:', error));

    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/faqs/${id}`, { title, content });
            alert('FAQ updated successfully');
            navigate('/faqBoard/faqDetails/ShowList');
        } catch (error) {
            console.error('Error updating FAQ:', error);
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
            <button type="submit">Update FAQ</button>
        </form>
    );
}

export default Update;
