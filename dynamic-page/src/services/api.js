import axios from 'axios';

// Fetch header data
export const fetchHeaderData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/header');
    return response.data || {};  // Return an empty object if response data is undefined
  } catch (error) {
    console.error('Error fetching header data:', error);
    return {};  // Fallback in case of error
  }
};

const API_URL = 'http://localhost:5000/api/links';

// Fetch all links
export const fetchLinks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error('Error fetching links:', err);
    return [];
  }
};
