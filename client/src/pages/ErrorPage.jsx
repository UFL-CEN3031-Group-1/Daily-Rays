import React from 'react';
import "../styles/ErrorPage.css";

const ErrorPage = ({ message }) => {
    return (
        <div className="error-page">
            <h1>Error</h1>
            <p>{message}</p>
        </div>
    );
};


export default ErrorPage;