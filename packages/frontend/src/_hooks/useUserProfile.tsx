import { useContext, useEffect, useState } from 'react';

import {
  UserProfileContext,
  UserProfileState,
} from '../_contexts/UserProfileContext';
import { useToast } from './useToast';

const LOCAL_STORAGE_KEY = 'userProfile';

const loadUserProfile = (): UserProfileState => {
  const storedProfile = localStorage?.getItem(LOCAL_STORAGE_KEY);
  return storedProfile ? JSON.parse(storedProfile) : {};
};

const saveUserProfile = (profile: Record<string, any>) => {
  localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  const { addToast } = useToast();

  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }

  const [profile, setProfile] = useState<UserProfileState>(loadUserProfile);

  useEffect(() => {
    const currentProfile = loadUserProfile();
    if (JSON.stringify(currentProfile) !== JSON.stringify(profile)) {
      saveUserProfile(profile);
      addToast({
        title: 'Profile updated',
        message: 'Changes saved successfully',
        type: 'success',
      });
    }
  }, [profile]);

  const setUsername = (username: string) => {
    setProfile((prev) => ({ ...prev, username }));
  };

  return {
    username: profile.username,
    setUsername,
  };
};
