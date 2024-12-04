import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AffirmationBoxWithValidation = ({ affirmation, setPositiveAffirmation }) => {
    const [isPositive, setIsPositive] = useState(null);

    useEffect(() => {
        const validateAffirmation = async () => {
            if (affirmation) {
                try {
                    const response = await axios.post('http://127.0.0.1:5050/api/predict', {
                        input: affirmation,
                    });
                    setIsPositive(response.data.prediction === "positive");
                    setPositiveAffirmation(response.data.prediction === "positive");
                } catch (error) {
                    console.error("Error validating affirmation", error);
                    setIsPositive(false); // In case of error, consider the affirmation not positive
                    setPositiveAffirmation(false);
                }
            } else {
                setIsPositive(false);
            }
        };

        validateAffirmation();
    }, [affirmation]); // Runs whenever the affirmation prop changes

    // Show loading state while validation is happening
    if (isPositive === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>{isPositive ? 'Positive affirmation!' : 'Please enter a positive affirmation.'}</p>
        </div>
    );
};

export default AffirmationBoxWithValidation;
