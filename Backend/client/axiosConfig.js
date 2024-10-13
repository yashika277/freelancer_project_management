import axios from 'axios';

// Retrieve token from local storage
const fetchToken = () => localStorage.getItem('token');

// Set up axios interceptor to include authorization header
axios.interceptors.request.use(
  (config) => {
    const token = fetchToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);
