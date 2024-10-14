import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Get Firebase Authentication instance
import { fetchData } from '../api/backend'; // Fetch user details from custom users database
import Loading from './Loading';
import ErrorPage from './ErrorPage';

const UserOwnProfile = () => {
  const auth = getAuth(); // Initialize Firebase Authentication
  const currentUser = auth.currentUser; // Get the currently signed-in user

  // Custom user data (from Firestore)
  const [userDetails, setUserDetails] = useState({
    username: '',
    points: 0,
    uid: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch additional user data from Firestore
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!currentUser) {
        setError('User is not authenticated.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Fetch user data from the custom users database using the UID
        const response = await fetchData(`/users/${currentUser.uid}`);
        setUserDetails({
          username: response.data.username,
          points: response.data.points,
          uid: response.data.uid
        });
        setError(null);
      } catch (err) {
        setError(`Error fetching user details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (!currentUser) {
    return <ErrorPage message="No authenticated user." />;
  }

  return (
    <div>
      <h1>Your Profile</h1>

      {/* Display Firebase Authentication details */}
      <div>
        <h2>Authentication Details</h2>
        <div>
          <label>Email:</label>
          <span>{currentUser.email}</span>
        </div>
        <div>
          <label>UID:</label>
          <span>{currentUser.uid}</span>
        </div>
      </div>

      {/* Display custom user database details */}
      <div>
        <h2>User Profile</h2>
        <div>
          <label>Username:</label>
          <span>{userDetails.username}</span>
        </div>
        <div>
          <label>Points:</label>
          <span>{userDetails.points}</span>
        </div>
        <div>
          <label>UID:</label>
          <span>{userDetails.uid}</span>
        </div>
      </div>
    </div>
  );
};

export default UserOwnProfile;
