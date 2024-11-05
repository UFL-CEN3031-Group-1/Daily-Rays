// src/contexts/UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Create the UserContext
const UserContext = createContext();

// UserProvider component to wrap your app and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data: { email, firebaseUid, username, points, customUid }
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores any errors

  const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    const auth = getAuth();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Reference to the user's document in Firestore
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser({
              email: currentUser.email,
              firebaseUid: currentUser.uid,
              username: userData.username || 'anonymous',
              points: userData.points || 0,
              customUid: userData.uid || '',
            });
          } else {
            console.warn('No such user document!');
            setUser({
              email: currentUser.email,
              firebaseUid: currentUser.uid,
              username: 'anonymous',
              points: 0,
              customUid: '',
            });
          }
        } catch (fetchError) {
          console.error('Error fetching user data:', fetchError);
          setError('Failed to fetch user data.');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [db]);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
