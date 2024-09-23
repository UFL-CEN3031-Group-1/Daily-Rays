import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/backend';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

import Loading from './Loading';
import ErrorPage from './ErrorPage';

import useAsync from '../hooks/useAsync';

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      setLoading(true);
      try {
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
