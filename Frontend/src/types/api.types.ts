// Common API types used across React Query hooks

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
}
