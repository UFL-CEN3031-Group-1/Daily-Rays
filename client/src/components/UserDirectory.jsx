import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import { fetchData } from '../api/backend'; // If you're fetching additional data
import { Link } from 'react-router-dom';
import Loading from './Loading';
import ErrorPage from './ErrorPage';

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(); // Get Firebase auth object
  const currentUser = auth.currentUser; // Get the currently authenticated user

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Fetch additional users from your database or Firestore
        const response = await fetchData('/users'); 
        
        if (isMounted) {
          setUsers(response.data);
          setError(null);
        }
      } catch (err) {
        const parsedError = JSON.parse(err.message);
        if (isMounted) {
          setError(parsedError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage message={error} />;
  }

  if (users.length === 0) {
    return <ErrorPage message="No users found!" />;
  }

  return (
    <div>
      <h1>Profile Page</h1>

      {/* Show the current logged-in user */}
      {currentUser && (
        <div>
          <h2>Current User: {currentUser.email}</h2> {/* Display authenticated user's email */}
        </div>
      )}

      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <Link to={`/users/${user.username}`}>
              {user.firstName} {user.lastName} | {user.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDirectory;
