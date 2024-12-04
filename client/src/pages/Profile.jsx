import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { useUser } from '../contexts/UserContext';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import { fetchUserByUsername } from '../api/user'; // Ensure this function exists
import UserDirectory from '../components/UserDirectory'

const Profile = () => {
  const { username } = useParams(); // Get the username from the URL
  const { user: currentUser, loading: userLoading, error: userError } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userLoading) return; // Wait until UserContext is loaded

    const getProfileData = async () => {
      // Check if viewing own profile
      if (currentUser && currentUser.username === username) {
        console.log('Viewing own profile:', currentUser);
        setProfileData(currentUser);
        setLoading(false);
      } else {
        // Fetch other user's profile data
        try {
          const response = await fetchUserByUsername(username);
          console.log('Fetched profile data for:', username, response);
          if (response.data) {
            setProfileData(response.data);
          } else {
            setError('User not found.');
          }
        } catch (err) {
          setError('Error fetching user data.');
        } finally {
          setLoading(false);
        }
      }
    };

    getProfileData();
  }, [username, currentUser, userLoading]);

  if (userLoading || loading) return <Loading />;
  if (userError) return <ErrorPage message={userError} />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="profile-container">
      <h1>{profileData.username}'s Profile</h1>
      <ProfileCard uid={profileData.firebaseUid} />
      <UserDirectory />
    </div>
  );
};

export default Profile;
