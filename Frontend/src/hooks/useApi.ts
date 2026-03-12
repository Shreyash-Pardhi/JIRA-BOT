// Custom hooks for data fetching with React Query
// This pattern allows easy integration of API calls with caching, background refresh, and error handling

import { useQuery, useMutation } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import apiService from '../services/api.service';

// ========== Issues API Hooks ==========

interface Issue {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Fetch all issues with caching
 * - On page reload: Returns cached data instantly while refetching in background
 * - Stale after 5 minutes: Triggers background refresh
 * Example: const { data, isLoading, error } = useIssues();
 */
export const useIssues = (): UseQueryResult<Issue[], Error> => {
    return useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const response = await apiService.get<Issue[]>('/issues');
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // Data fresh for 5 minutes
        gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
        refetchOnWindowFocus: true, // Refetch when window regains focus
    });
};

/**
 * Fetch single issue by ID
 */
export const useIssueById = (id: string): UseQueryResult<Issue, Error> => {
    return useQuery({
        queryKey: ['issue', id],
        queryFn: async () => {
            const response = await apiService.get<Issue>(`/issues/${id}`);
            return response.data;
        },
        enabled: !!id, // Only run query if id exists
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
};

/**
 * Create new issue with automatic cache update
 * Example usage:
 * const mutation = useCreateIssue();
 * mutation.mutate({ title: "New Issue", ... })
 */
export const useCreateIssue = () => {
    return useMutation({
        mutationFn: async (data: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => {
            const response = await apiService.post<Issue>('/issues', data);
            return response.data;
        },
        // Optimistic update: update cache before response comes back (optional)
        // Use onSuccess to invalidate queries and refetch
    });
};

/**
 * Update issue with automatic cache update
 */
export const useUpdateIssue = (issueId: string) => {
    return useMutation({
        mutationFn: async (data: Partial<Issue>) => {
            const response = await apiService.patch<Issue>(`/issues/${issueId}`, data);
            return response.data;
        },
    });
};

/**
 * Delete issue
 */
export const useDeleteIssue = (issueId: string) => {
    return useMutation({
        mutationFn: async () => {
            await apiService.delete(`/issues/${issueId}`);
        },
    });
};

// ========== Users API Hooks ==========

interface UserProfile {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
}

/**
 * Fetch user profile with caching
 */
export const useUserProfile = (userId: string): UseQueryResult<UserProfile, Error> => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const response = await apiService.get<UserProfile>(`/users/${userId}`);
            return response.data;
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
};

/**
 * Update user profile
 */
export const useUpdateUserProfile = (userId: string) => {
    return useMutation({
        mutationFn: async (data: Partial<UserProfile>) => {
            const response = await apiService.patch<UserProfile>(`/users/${userId}`, data);
            return response.data;
        },
    });
};
