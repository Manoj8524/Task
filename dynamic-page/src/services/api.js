import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const fetchHeaderData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/header`);
    return response.data || {}; 
  } catch (error) {
    console.error('Error fetching header data:', error);
    return {}; 
  }
};

export const fetchLinks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/links`);
    return response.data;
  } catch (err) {
    console.error('Error fetching links:', err);
    return [];
  }
};
