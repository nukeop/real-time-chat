import { useContext, useEffect } from 'react';
import { BackendEvent } from '../api/backend.types';
import { BackendSocketContext } from '../contexts/BackendSocketContext';

export const useBackendSocket = (
  event: BackendEvent,
  callback: (data: any) => void,
) => {
  const { socket } = useContext(BackendSocketContext)!;

  useEffect(() => {
    if (!socket) return;

    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [socket, event, callback]);

  return socket;
};
