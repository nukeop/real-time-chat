import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';
import { BackendSocketProvider } from './_contexts/BackendSocketContext';
import { UserProfileProvider } from './_contexts/UserProfileContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BackendSocketProvider>
      <UserProfileProvider>
        <App />
      </UserProfileProvider>
    </BackendSocketProvider>
  </StrictMode>,
);
