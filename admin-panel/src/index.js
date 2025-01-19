import React from 'react';
import ReactDOM from 'react-dom/client';  // Import the new API
import App from './App';
import './index.css';

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use the new render method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
