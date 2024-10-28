import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { fetchData } from '../api/backend';
import Loading from '../pages/Loading';
import ErrorPage from '../pages/ErrorPage';

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    firebaseUid: '',
    username: '',
    points: 0,
    customUid: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setError('User is not authenticated.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Fetch additional user data using the current user's UID
        const response = await fetchData(`/users/${currentUser.uid}`);
        setUserDetails({
          email: currentUser.email,
          firebaseUid: currentUser.uid,
          username: response.data.username,
          points: response.data.points,
          customUid: response.data.uid
        });
        setError(null);
      } catch (err) {
        setError(`Error fetching user details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;

  return (
    <Card sx={{ padding: '1rem', marginBottom: '2rem' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Email</Typography>
            <Typography>{userDetails.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Firebase UID</Typography>
            <Typography>{userDetails.firebaseUid}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Username</Typography>
            <Typography>{userDetails.username || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Points</Typography>
            <Typography>{userDetails.points}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Custom UID</Typography>
            <Typography>{userDetails.customUid}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
