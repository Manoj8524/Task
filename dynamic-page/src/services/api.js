import axios from 'axios';

// Base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch header data
export const fetchHeaderData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/header`);
    return response.data || {}; // Return an empty object if response data is undefined
  } catch (error) {
    console.error('Error fetching header data:', error);
    return {}; // Fallback in case of error
  }
};

// Fetch all links
export const fetchLinks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/links`);
    return response.data;
  } catch (err) {
    console.error('Error fetching links:', err);
    return [];
  }
};
