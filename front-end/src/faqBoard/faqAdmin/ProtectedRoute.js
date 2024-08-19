import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem('token') !== null;

    if (!isAuthenticated) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/Auth" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;