import React, { useEffect, useState } from 'react';
import { fetchUserDataByUid } from '../api/backend';
import Loading from '../pages/Loading';
import ErrorPage from '../pages/ErrorPage';

const ProfileCard = ({ uid }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) {
      setError('Invalid UID.');
      setLoading(false);
      return;
    }

    console.log('Fetching profile data for UID:', uid);

    const getProfileData = async () => {
      try {
        const response = await fetchUserDataByUid(uid);
        console.log('Fetched data for UID:', uid, response);
        if (response.data) {
          setProfileData(response.data);
        } else {
          setError('Profile data not found.');
        }
      } catch (err) {
        setError('Error fetching profile data.');
      } finally {
        setLoading(false);
      }
    };

    getProfileData();
  }, [uid]);
  
  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="profile-card">
      <h2>{profileData.username}</h2>
      <p>Name: {profileData.firstName + " "+profileData.lastName}</p>
      <p>Points: {profileData.points}</p>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default ProfileCard;
