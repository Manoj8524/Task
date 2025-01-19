import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import './index.css'; // Import your CSS file for styles

// Create a root and render the application
const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure your index.html has a div with id 'root'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
