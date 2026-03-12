import apiService from './api.service';
import { API_ENDPOINTS } from './api.constants';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}

export interface AuthResponse {
    user: User;
    message?: string;
}

// Authentication service
class AuthService {
    // Login user
    async login(credentials: LoginPayload) {
        const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    }

    // Register user
    async register(userData: RegisterPayload) {
        const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);
        return response.data;
    }

    // Logout user
    async logout() {
        const response = await apiService.post<{ message: string }>(API_ENDPOINTS.AUTH.LOGOUT);
        return response.data;
    }

    async getCurrentUser() {
        const response = await apiService.get<User>(API_ENDPOINTS.AUTH.GET_CURRENT_USER);
        return response.data;
    }
}

export default new AuthService();
