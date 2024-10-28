import React, { useState } from 'react';
import { registerWithEmailPassword } from '../auth';
import { Button, TextField, Typography, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault(); // Add this line
        try {
            const [firstName, lastName] = fullName.trim().split(' ');
            const user = await registerWithEmailPassword(email, password, firstName, lastName, username);
            console.log('Registration successful', user);
            navigate('/');
        } catch (error) {
            alert('Registration failed' + error);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
            </Typography>

            <form onSubmit={handleSignUp}>
                <Stack spacing={2}>
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                    />
                    <Button
                        variant="text"
                        type="submit"
                        fullWidth
                        sx={{ color: '#333333' }}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default SignUp;
