export const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
);

export const LoadingSkeleton = () => (
    <div className="w-full max-w-md mx-auto space-y-4 animate-pulse">
        <div className="h-12 bg-gray-200 rounded-lg"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
        <div className="h-10 bg-gray-200 rounded-lg"></div>
    </div>
);
