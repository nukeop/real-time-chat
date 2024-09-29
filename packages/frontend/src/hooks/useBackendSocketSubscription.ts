import { ServerEvent } from '@real-time-chat/core';
import { useEffect } from 'react';
import { useBackendSocket } from './useBackendSocket';

export const useBackendSocketSubscription = (
  event: ServerEvent,
  callback: (data: any) => void,
) => {
  const socket = useBackendSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [socket, event, callback]);

  return socket;
};
