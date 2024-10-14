import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { signOutUser, onAuthStateChangedListener } from '../auth';

const Header = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            setCurrentUser(user); // Update state when user signs in or out
        });
        return () => unsubscribe();
    }, []);

    // Handle sign-out
    const handleSignOut = async () => {
        try {
            await signOutUser();
            setCurrentUser(null); // Clear current user from state after sign-out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };
    // console.log(currentUser);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">DailyRay</Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/directory">Directory</Link></li>

                    {currentUser ? (
                        <>
                            <li>
                            <span>{currentUser.isAnonymous ? "Anonymous" : currentUser.email}</span>
                            </li>
                            <li>
                                <span onClick={handleSignOut}>Sign Out</span>
                            </li>
                        </>
                    ) : (
                        <li><Link to="/signin">Sign In</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
