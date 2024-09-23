import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { LoadingProvider } from './contexts/LoadingContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Wrap in loadingProvider to apply loading context to all pages
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </React.StrictMode>
);
