import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Set your base URL here
  withCredentials: true, // Enable credentials
});

export default api;
