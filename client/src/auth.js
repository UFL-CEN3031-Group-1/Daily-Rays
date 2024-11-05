import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInAnonymously, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";
  import { auth, firestore } from './firebase';
  import { doc, getDoc, setDoc } from "firebase/firestore";
  
  // Google Sign-In
  export const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // Email/Password Sign-In
  export const signInWithEmailPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // Register with Email/Password and store additional user data in Firestore (note: needed to maintain additional fields besides default auth ones)
export const registerWithEmailPassword = async (email, password, firstName="", lastName="", userName="") => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
  
      await setDoc(doc(firestore, 'users', user.uid), {
        username: userName ? userName : email.split('@')[0],         
        firstName: firstName,
        lastName: lastName,   
        points: 0,                     
        uid: user.uid                 
      });
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
        console.log('Fetched user from Firestore:', userDoc.data());
        } else {
        console.error('No user document found in Firestore');
        }
  
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // Anonymous Sign-In
  export const signInAnonymouslyUser = async () => {
    try {
      const result = await signInAnonymously(auth);
      return result.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // Sign-Out
  export const signOutUser = async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  //returns curr user or null if not signed in
  export const getCurrentUser = () => {
    return auth.currentUser;
  };
  
  // Listen for auth stat changes (ex. track user session across app)
  export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
  };
  