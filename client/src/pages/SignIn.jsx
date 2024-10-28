import React, { useState } from 'react';
import { signInWithGoogle, signInWithEmailPassword, signInAnonymouslyUser } from '../auth';
import { Button, TextField, Typography, Box, Stack, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    // Handle Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            const user = await signInWithGoogle();
            navigate('/');
        } catch (error) {
            console.error('Google sign-in failed', error);
        }
    };

    // Handle Email/Password Sign-In
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailPassword(email, password);
            navigate('/');
        } catch (error) {
            console.error('Email sign-in failed', error);
        }
    };

    // Handle Anonymous Sign-In
    const handleAnonymousSignIn = async () => {
        try {
            const user = await signInAnonymouslyUser();
            navigate('/');
        } catch (error) {
            console.error('Anonymous sign-in failed', error);
        }
    };

    return (
        <Box className="sign-in-page" sx={{ maxWidth: 400, mx: 'auto', mt: 5, textAlign: 'center' }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    fontSize: '2.5rem',
                    letterSpacing: 1.5,
                    mb: 3,
                }}
            >
                Welcome Back!
            </Typography>


            <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{width: '100%' }}
            >
                Sign in with Google
            </Button>

            <Divider
                sx={{
                    my: 1,
                    fontWeight: 'light',
                    borderBottomWidth: '2px',
                    color: 'text.secondary',
                }}
            >
                or
            </Divider>

            <form onSubmit={handleEmailSubmit}>
                <Stack spacing={2}>
                    <TextField
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        type="password"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                    />
                    <Button variant="contained" type="submit" fullWidth>
                        Sign In
                    </Button>
                </Stack>
            </form>

            <Divider
                sx={{
                    my: 1,
                    fontWeight: 'light',
                    borderBottomWidth: '2px',
                    color: 'text.secondary',
                }}
            >
                or
            </Divider>

            <Button
                variant="text" // not as apparent as contained
                onClick={handleAnonymousSignIn}
                sx={{ width: '100%', color: '#333333'}}
            >
                Sign in Anonymously
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Typography
                    component="span"
                    onClick={() => navigate('/signup')} // Navigate to Sign Up page
                    sx={{ color: 'primary.main', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Sign Up
                </Typography>
            </Typography>

        </Box>
    );
};

export default SignIn;
