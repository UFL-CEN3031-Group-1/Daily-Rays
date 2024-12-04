// src/components/Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { useUser } from '../contexts/UserContext';
import { signOutUser } from '../auth'; // Ensure this function correctly signs out the user
import rotateSunGif from '../images/rotate_sun.gif';

const Header = () => {
  const { user, loading, error } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate('/signin');
    } catch (signOutError) {
      console.error('Error signing out:', signOutError);
      // Optionally, set an error state or notify the user
    }
  };

  if (loading) {
    // Optionally, return a loading spinner or null
    return null;
  }

  if (error) {
    // Optionally, render an error message or component
    return <div>Error: {error}</div>;
  }

  return (
    <header className="header">
      <div className="logo" >
        <Link to="/">
          <img src={rotateSunGif} alt="Daily Rays" style={{height: '50px', padding: 0, margin: 0 }} />
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/affirmation">Affirmation</Link></li>
          <li><Link to="/mindfulminutes">Mindful Minutes</Link></li>
          {user ? (
            <>
              <li>
                <Link to={`/profile/${user.username}`}>
                  Profile
                </Link>
              </li>
              <li>
                <span onClick={handleSignOut} style={{ cursor: 'pointer' }}>
                  Sign Out
                </span>
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
