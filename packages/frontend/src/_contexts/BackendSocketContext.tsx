import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { socketBaseUrl } from '../api/client';

type BackendSocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
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
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    setIsConnecting(true);
    const socketInstance = io(`${socketBaseUrl}`);

    socketInstance.on('connect', () => {
      setIsConnected(true);
      setIsConnecting(false);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      setIsConnecting(false);
    });

    socketInstance.on('connect_error', () => {
      setIsConnecting(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <BackendSocketContext.Provider
      value={{ socket, isConnected, isConnecting }}
    >
      {children}
    </BackendSocketContext.Provider>
  );
};
