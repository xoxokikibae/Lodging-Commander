import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Delete.css';

const Delete = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                await axios.delete(`http://localhost:8080/api/faqs/${id}`);
                navigate('/faqBoard/faqDetails/ShowList');
            } catch (error) {
                console.error('Error deleting FAQ:', error);
                setError('Failed to delete FAQ. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id, navigate]);

    if (isLoading) {
        return <div>Deleting...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return null; // This will not be rendered as the component will navigate away or show error
};

export default Delete;