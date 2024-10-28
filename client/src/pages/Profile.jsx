import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import ProfileCard from '../components/ProfileCard';
import UserDirectory from '../components/UserDirectory';

const Profile = () => {
  return (
    <div>
      <ProfileCard />
      <UserDirectory />
    </div>
  );
};

export default Profile;
