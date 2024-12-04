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
            const response = await axios.post('http://127.0.0.1:5050/api/predict', {
                input: input,
            });
            setSubmittedText(response.data.prediction || response.data.error); // Adjust based on Flask response
            setInput(''); // Clear input after submission
            console.log(setSubmittedText)
        } catch (error) {
            console.error('Error submitting text:', error);
        }
    };

    return (
        <div>
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
