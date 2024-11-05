import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { fetchData } from '../api/backend';
import Loading from '../pages/Loading';
import ErrorPage from '../pages/ErrorPage';

const UserDirectory = () => {
  interface User {
    firstName: string;
    lastName: string;
    username: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      } catch (err: any) {
        let parsedError = 'An error occurred while fetching users.';
        try {
          parsedError = JSON.parse(err.message).message;
        } catch (e) {
          console.error('Error parsing error message:', e);
        }
        if (isMounted) {
          setError(parsedError);
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
    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
      <Typography variant="h4" gutterBottom>User Directory</Typography>

      <List>
        {users.map((user, index) => (
          <ListItem key={index} sx={{ justifyContent: 'center' }}>
            <ListItemText>
              <Link
                to={`/profile/${user.username}`}
                style={{ textDecoration: 'none', color: 'blue' }}
              >
                {user.firstName} {user.lastName} | {user.username}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserDirectory;
