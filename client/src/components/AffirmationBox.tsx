// AffirmationBox.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AffirmationBox = () => {
    const [input, setInput] = useState('');
    const [submittedText, setSubmittedText] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/sentiment', {
                text: input,
            });
            setSubmittedText(response.data.message); // Adjust based on Flask response
            setInput(''); // Clear input after submission
        } catch (error) {
            console.error('Error submitting text:', error);
        }
    };

    return (
        <div>
            <h2>Affirmation Box</h2>
            <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message here..."
            />
            <button onClick={handleSubmit}>Submit</button>
            {submittedText && (
                <p style={{ fontWeight: 'bold' }}>{submittedText}</p>
            )}
        </div>
    );
};

export default AffirmationBox;
