'use client';

import { StrictMode } from 'react';
import { BackendSocketProvider } from '../contexts/BackendSocketContext';
import { UserProfileProvider } from '../contexts/UserProfileContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <BackendSocketProvider>
        <UserProfileProvider>{children}</UserProfileProvider>
      </BackendSocketProvider>
    </StrictMode>
  );
}
