import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/backend';
import { useParams } from 'react-router-dom';

import Loading from './Loading';
import ErrorPage from './ErrorPage';

const UserPage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        console.log(username);
        const response = await fetchData('/users/' + username);
        setUser(response.data);
        setError(null);
      } catch (error) {
        if (!error.response) {
          // Request made but no response or error
          setError("Network error: " + error.message);
        } else {
          // Status code not in 200 range
          setError(`Server error ${error.response.status}: ${error.response.data.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading) {
    return <Loading />;
  }

  if(error) {
    return <ErrorPage message={error} />;
  }

  if (!user) {
    return <ErrorPage message="User does not exist" />;
  }

  return (
    <div>
      <h1>{user.firstName + ", " + user.lastName}</h1>
      <p>{user.email}</p>
      <h2>{user.username}</h2>
    </div>
  );
};

export default UserPage;
