import { useContext } from 'react';
import { BackendSocketContext } from '../../_contexts/BackendSocketContext';

export const useConnectionStatus = () => {
  const { isConnected } = useContext(BackendSocketContext)!;

  return isConnected;
};
