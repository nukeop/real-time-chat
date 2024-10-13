import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';
import { BackendSocketProvider } from './contexts/BackendSocketContext';
import { UserProfileProvider } from './contexts/UserProfileContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BackendSocketProvider>
      <UserProfileProvider>
        <App />
      </UserProfileProvider>
    </BackendSocketProvider>
  </StrictMode>,
);
