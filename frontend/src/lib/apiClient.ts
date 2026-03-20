import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

// Request interceptor to add the auth token header to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh / logout
apiClient.interceptors.response.use(
  (response) => {
    // If the response is in our standardized format, unwrap it
    if (response.data && response.data.success !== undefined && response.data.data !== undefined) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Normalize error object for the frontend
    const errorData = error.response?.data?.error || {
      message: error.message || 'An unexpected error occurred',
      statusCode: error.response?.status || 500
    };
    
    // Add normalized error to the error object for catch blocks
    (error as any).apiError = errorData;

    // Handle 401 scenarios
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { accessToken, logout } = useAuthStore.getState();
      // Only logout if we actually have a token (prevent loop)
      if (accessToken) {
        logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
