import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
export const AuthContext = createContext(null);
const AuthProviders = ({children}) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };
  const signOutHandle = () => {
    signOut(auth);
  };
  const manageProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const info = {
    user,
    loading,
    signInUser,
    signUpUser,
    googleSignIn,
    setUser,
    signOutHandle,
    manageProfile,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        const {data} = await axios.post('https://rentride-ecru.vercel.app/jwt',{
          email: currentUser?.email
        },
        { withCredentials: true })
      } else {
        setUser(null);
        const {data} = await axios.get('https://rentride-ecru.vercel.app/logout',
        { withCredentials: true })
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProviders;
