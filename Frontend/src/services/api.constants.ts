/**
 * API Endpoints Constants
 * Centralized location for all API endpoint URLs
 */

export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: 'api/auth/login',
        REGISTER: 'api/auth/register',
        LOGOUT: 'api/auth/logout',
        GET_CURRENT_USER: 'api/auth/me',
    },

    // User endpoints
    USERS: {
        GET_ALL: 'api/users',
        GET_BY_ID: (id: string) => `api/users/${id}`,
        CREATE: 'api/users',
        UPDATE: (id: string) => `api/users/${id}`,
        DELETE: (id: string) => `api/users/${id}`,
    },

    // Issue endpoints
    ISSUES: {
        GET_ALL: 'api/issues',
        GET_BY_ID: (id: string) => `api/issues/${id}`,
        CREATE: 'api/issues',
        UPDATE: (id: string) => `api/issues/${id}`,
        DELETE: (id: string) => `api/issues/${id}`,
    },

    // AI endpoints
    AI: {
        GENERATE: 'api/ai/generate',
        ANALYZE: 'api/ai/analyze',
    },
} as const;
