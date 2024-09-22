import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { BackendSocketProvider } from './contexts/BackendSocketContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BackendSocketProvider>
      <App />
    </BackendSocketProvider>
  </StrictMode>,
);
