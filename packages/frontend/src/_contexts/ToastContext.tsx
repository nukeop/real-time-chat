import { createContext, FC, useCallback, useState } from 'react';

import ToastContainer from '../_components/Toasts/ToastContainer';

type ToastContextType = {
  addToast: (toast: Omit<ToastState, 'id'>) => void;
  removeToast: (id: number) => void;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

export type ToastState = {
  id: number;
  title: string;
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const addToast = useCallback((toast: Omit<ToastState, 'id'>) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};
