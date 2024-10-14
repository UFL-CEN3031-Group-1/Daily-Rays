import React, { useState } from 'react';
import { signInWithGoogle, signInWithEmailPassword, signInAnonymouslyUser, registerWithEmailPassword } from '../auth';
import '../styles/SignIn.css'; // Optional CSS for styling

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // Toggle for Sign In / Sign Up

    // Handle Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            const user = await signInWithGoogle();
            console.log('Google sign-in successful', user);
        } catch (error) {
            console.error('Google sign-in failed', error);
        }
    };

    // Handle Email/Password Sign-In or Sign-Up
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                const user = await registerWithEmailPassword(email, password);
                console.log('Registration successful', user);
            } else {
                const user = await signInWithEmailPassword(email, password);
                console.log('Email sign-in successful', user);
            }
        } catch (error) {
            console.error('Email sign-in/up failed', error);
        }
    };

    // Handle Anonymous Sign-In
    const handleAnonymousSignIn = async () => {
        try {
            const user = await signInAnonymouslyUser();
            console.log('Anonymous sign-in successful', user);
        } catch (error) {
            console.error('Anonymous sign-in failed', error);
        }
    };

    return (
        <div className="sign-in-page">
            <h1>Sign In</h1>
            <button className="google-sign-in" onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>

            <div className="email-sign-in">
                <h2>{isSignUp ? 'Sign Up' : 'Sign In'} with Email/Password</h2>
                <form onSubmit={handleEmailSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                <p>
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <span onClick={() => setIsSignUp(!isSignUp)} className="toggle-signup">
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </span>
                </p>
            </div>

            <button className="anonymous-sign-in" onClick={handleAnonymousSignIn}>
                Sign in Anonymously
            </button>
        </div>
    );
};

export default SignIn;
