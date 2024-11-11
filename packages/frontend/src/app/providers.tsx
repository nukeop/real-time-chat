'use client';

import { StrictMode } from 'react';

import { BackendSocketProvider } from '../_contexts/BackendSocketContext';
import { ToastProvider } from '../_contexts/ToastContext';
import { UserProfileProvider } from '../_contexts/UserProfileContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <BackendSocketProvider>
        <UserProfileProvider>
          <ToastProvider>{children}</ToastProvider>
        </UserProfileProvider>
      </BackendSocketProvider>
    </StrictMode>
  );
}
