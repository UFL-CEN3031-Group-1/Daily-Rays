import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchData } from '../api/backend';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import ErrorPage from '../pages/ErrorPage';
import ProfileCard from './ProfileCard';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const UserDirectory = () => {
  interface User {
    firstName: string;
    lastName: string;
    username: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const currentUser = auth.currentUser;

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

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;
  if (users.length === 0) return <ErrorPage message="No users found!" />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Profile Page</Typography>

      {currentUser && <ProfileCard/>}

      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Link to={`/users/${user.username}`} style={{ textDecoration: 'none', color: 'blue' }}>
                {user.firstName} {user.lastName} | {user.username}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserDirectory;
