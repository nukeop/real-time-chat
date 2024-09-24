import { ServerEvent } from '@real-time-chat/core';
import { useContext, useEffect } from 'react';
import { BackendSocketContext } from '../contexts/BackendSocketContext';

export const useBackendSocket = (
  event: ServerEvent,
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
