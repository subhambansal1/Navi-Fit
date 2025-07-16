import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem('userProfile');
        if (stored) setUserProfile(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load user profile:', e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const signIn = async (profile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      setUserProfile(profile);
    } catch (e) {
      console.error('Error during sign-in:', e);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userProfile');
      setUserProfile(null);
    } catch (e) {
      console.error('Error during sign-out:', e);
    }
  };

  const saveProfile = async (updatedProfile) => {
    try {
      const newProfile = { ...userProfile, ...updatedProfile };
      await AsyncStorage.setItem('userProfile', JSON.stringify(newProfile));
      setUserProfile(newProfile);
    } catch (e) {
      console.error('Error saving profile:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        loading,
        signIn,
        signOut,
        saveProfile,
        updateProfile: saveProfile, // 🔁 alias to fix undefined error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
