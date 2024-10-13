import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { socketBaseUrl } from '../api/client';

type BackendSocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

type BackendSocketProviderProps = {
  children: React.ReactNode;
};

export const BackendSocketContext =
  createContext<BackendSocketContextType | null>(null);

export const BackendSocketProvider: React.FC<BackendSocketProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(`${socketBaseUrl}`);
    setSocket(socketInstance);

    socketInstance.on('connect', () => setIsConnected(true));
    socketInstance.on('disconnect', () => setIsConnected(false));

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <BackendSocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </BackendSocketContext.Provider>
  );
};
