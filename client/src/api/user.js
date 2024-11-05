import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
const db = getFirestore();

/**
 * Fetch user data from Firestore using UID
 * @param {string} uid - The user's Firebase UID
 * @returns {Promise<Object>} - The user data
 */
export const fetchUserData = async (uid) => {
  if (!uid) throw new Error('UID is required to fetch user data.');

  const userDocRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userDocRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error('No such user!');
  }
};

export const fetchUserByUsername = async (username) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Assuming usernames are unique, return the first match with firebaseUid
        const userDoc = querySnapshot.docs[0];
        return { data: { ...userDoc.data(), firebaseUid: userDoc.id } };
      } else {
        return { data: null };
      }
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw error;
    }
  };
  
  /**
   * Fetches user data by UID from Firestore.
   * @param {string} uid - The UID of the user.
   * @returns {Promise<Object>} - The user data object or null if not found.
   */
  export const fetchUserDataByUid = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        return { data: { ...userDocSnap.data(), firebaseUid: userDocSnap.id } };
      } else {
        return { data: null };
      }
    } catch (error) {
      console.error('Error fetching user by UID:', error);
      throw error;
    }
  };