import React from 'react';

interface SkeletonProps {
    count?: number;
    height?: string;
    width?: string;
    circle?: boolean;
    className?: string;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
    count = 1,
    height = '20px',
    width = '100%',
    circle = false,
    className = '',
}) => {
    return (
        <div className={className}>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="mb-4 animate-pulse bg-gray-300 dark:bg-gray-700 rounded"
                    style={{
                        height,
                        width: circle ? height : width,
                        borderRadius: circle ? '50%' : '8px',
                    }}
                />
            ))}
        </div>
    );
};

export const TableSkeletonLoader: React.FC<{ rows?: number; columns?: number }> = ({
    rows = 5,
    columns = 4,
}) => (
    <div className="space-y-4">
        {Array.from({ length: rows }).map((_, row) => (
            <div key={row} className="flex gap-4">
                {Array.from({ length: columns }).map((_, col) => (
                    <SkeletonLoader
                        key={`${row}-${col}`}
                        width="100%"
                        height="40px"
                        className="flex-1"
                    />
                ))}
            </div>
        ))}
    </div>
);

export const CardSkeletonLoader: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow animate-pulse">
        <SkeletonLoader height="20px" width="60%" className="mb-4" />
        <SkeletonLoader height="16px" width="100%" count={3} />
    </div>
);
