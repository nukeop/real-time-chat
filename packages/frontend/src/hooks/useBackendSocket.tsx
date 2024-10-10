import { useContext } from 'react';
import { BackendSocketContext } from '../contexts/BackendSocketContext';

export const useBackendSocket = () => {
  const context = useContext(BackendSocketContext)!;

  if (!context) {
    throw new Error(
      'useBackendSocket must be used within a BackendSocketProvider',
    );
  }

  return context.socket;
};
