// frontend/src/api.js
import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'http://localhost:8000', // Change this to your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add token to headers if it's present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export the Axios instance
export default api;
