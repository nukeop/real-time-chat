'use client';

import { StrictMode } from 'react';
import { BackendSocketProvider } from '../_contexts/BackendSocketContext';
import { UserProfileProvider } from '../_contexts/UserProfileContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <BackendSocketProvider>
        <UserProfileProvider>{children}</UserProfileProvider>
      </BackendSocketProvider>
    </StrictMode>
  );
}
