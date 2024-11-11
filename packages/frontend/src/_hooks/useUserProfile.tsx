import { useContext, useEffect, useState } from 'react';

import {
  UserProfileContext,
  UserProfileState,
} from '../_contexts/UserProfileContext';

const LOCAL_STORAGE_KEY = 'userProfile';

const loadUserProfile = (): UserProfileState => {
  const storedProfile = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedProfile ? JSON.parse(storedProfile) : {};
};

const saveUserProfile = (profile: Record<string, any>) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }

  const [profile, setProfile] = useState<UserProfileState>(loadUserProfile);

  useEffect(() => {
    saveUserProfile(profile);
  }, [profile]);

  const setUsername = (username: string) => {
    setProfile((prev) => ({ ...prev, username }));
  };

  return {
    username: profile.username,
    setUsername,
  };
};
