import axios from 'axios';

// Create axios instance with base configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // This ensures cookies are sent with requests
});

// Add request interceptor to include auth token if needed
apiClient.interceptors.request.use(
    (config) => {
        // You can add token to headers here if using localStorage instead of cookies
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Only redirect to login on 401 if not already on login/register page
        if (error.response?.status === 401) {
            const currentPath = window.location.pathname;
            const isAuthPage = ['/login', '/register'].includes(currentPath);

            if (!isAuthPage) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// API Service class with methods for different HTTP operations
class ApiService {
    // GET request
    async get<T = any>(endpoint: string, config?: any) {
        return apiClient.get<T>(endpoint, config);
    }

    // POST request
    async post<T = any>(endpoint: string, data?: any, config?: any) {
        return apiClient.post<T>(endpoint, data, config);
    }

    // PUT request
    async put<T = any>(endpoint: string, data?: any, config?: any) {
        return apiClient.put<T>(endpoint, data, config);
    }

    // PATCH request
    async patch<T = any>(endpoint: string, data?: any, config?: any) {
        return apiClient.patch<T>(endpoint, data, config);
    }

    // DELETE request
    async delete<T = any>(endpoint: string, config?: any) {
        return apiClient.delete<T>(endpoint, config);
    }
}

export default new ApiService();
