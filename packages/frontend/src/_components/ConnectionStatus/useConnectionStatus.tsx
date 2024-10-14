import { useContext } from 'react';
import { BackendSocketContext } from '../../_contexts/BackendSocketContext';

export const useConnectionStatus = () => {
  const { isConnected, isConnecting } = useContext(BackendSocketContext)!;

  return { isConnected, isConnecting };
};
