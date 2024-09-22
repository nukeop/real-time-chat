import { useContext } from 'react';
import { BackendSocketContext } from '../../contexts/BackendSocketContext';

export const useConnectionStatus = () => {
  const { isConnected } = useContext(BackendSocketContext)!;

  return isConnected;
};
