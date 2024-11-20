import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const AnonymousProfile = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/signin');
    };

    return (
        <div>
            <h1>You are signed in anonymously. To see your profile, please sign in as a guest</h1>
            <Button
                onClick={handleNavigate}
                variant="contained"
                color="primary"
            >
                Go to sign in
            </Button>
        </div>
    );
}

export default AnonymousProfile;
