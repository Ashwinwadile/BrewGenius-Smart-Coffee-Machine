import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { CoffeeProvider } from './context/CoffeeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CoffeeProvider>
        <App />
      </CoffeeProvider>
    </AuthProvider>
  </React.StrictMode>
);