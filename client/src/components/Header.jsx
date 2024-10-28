import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { signOutUser, onAuthStateChangedListener } from '../auth';

const Header = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOutUser();
            setCurrentUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
        navigate('/signin');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">DailyRay</Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/affirmation">Affirmation</Link></li>
                    <li><Link to="/mindfulminutes">Mindful Minutes</Link></li>
                    {currentUser ? (
                        <>
                            <li>
                                <Link to={`/profile/${currentUser.username ? currentUser.username : 'anonymous'}`}>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <span onClick={handleSignOut}>Sign Out</span>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/signin">Sign In</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
