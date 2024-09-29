import { useContext } from 'react';
import { BackendSocketContext } from '../contexts/BackendSocketContext';

export const useBackendSocket = () => {
  const { socket } = useContext(BackendSocketContext)!;

  return socket;
};
