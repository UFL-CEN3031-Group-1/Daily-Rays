import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/backend';
import { Link } from 'react-router-dom';

import Loading from './Loading';
import ErrorPage from './ErrorPage';

import useAsync from '../hooks/useAsync';

const UserOwnProfile = () => {
  // Needs to be fetched dynamically in the future
  const username = 'RickRoyale';

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editableUser, setEditableUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  });

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        console.log(username);
        const response = await fetchData('/users/' + username);
        setUser(response.data);
        setEditableUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          username: response.data.username
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (!user) {
    return <ErrorPage message="User does not exist" />;
  }

  // Needs to add backend route to actually change fields - note that username is read-only
  return (
    <div>
      <h1>Your Profile</h1>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={editableUser.firstName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={editableUser.lastName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={editableUser.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={editableUser.username}
            readOnly
          />
        </label>
      </div>
    </div>
  );
};

export default UserOwnProfile;