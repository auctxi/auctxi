import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  // Vite proxy config will route /api to localhost:8080 (core-service)
  // Payment service runs on 8081, so we might need absolute URL or another proxy for payments.
  baseURL: '/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    toast.error(message);
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// We define a separate instance for Payment Service if we don't use proxy
const paymentApi = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

paymentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

paymentApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Payment Service Error';
    toast.error(message);
    return Promise.reject(error);
  }
);


export { api, paymentApi };
