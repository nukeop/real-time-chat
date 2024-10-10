import { useContext } from 'react';
import { UserProfileContext } from '../contexts/UserProfileContext';

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }

  const { username, setUsername } = context;

  return { username, setUsername };
};
