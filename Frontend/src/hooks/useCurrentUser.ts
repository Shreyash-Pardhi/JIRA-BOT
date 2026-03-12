import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import authService from '../services/auth.service';
import type { User } from '../services/auth.service';

export const useCurrentUser = (): UseQueryResult<User, Error> => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await authService.getCurrentUser();
            if (!response) {
                throw new Error('User not found');
            }
            return response;
        },
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
    });
};
