import React from 'react';
import { useIssues } from '../../hooks/useApi';
import { TableSkeletonLoader } from '../common/SkeletonLoader';

/**
 * Example component showing React Query + Skeleton loader pattern
 * On browser reload:
 * 1. Cached data (if available) displays instantly
 * 2. Skeleton loader appears briefly if data is stale
 * 3. Background refetch happens automatically
 * 4. UI updates when new data arrives
 */
const IssuesPageExample: React.FC = () => {
    const { data: issues, isLoading, isError, error, refetch } = useIssues();

    if (isError) {
        return (
            <div className="p-6 bg-red-50 dark:bg-red-900 rounded-lg">
                <h2 className="text-red-800 dark:text-red-200 font-semibold">Error loading issues</h2>
                <p className="text-red-700 dark:text-red-300 text-sm mt-2">{error?.message}</p>
                <button
                    onClick={() => refetch()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Issues</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Create Issue
                </button>
            </div>

            {/* Show skeleton loaders while fetching */}
            {isLoading && !issues ? (
                <TableSkeletonLoader rows={5} columns={3} />
            ) : (
                <div className="space-y-4">
                    {issues && issues.length > 0 ? (
                        issues.map((issue) => (
                            <div
                                key={issue.id}
                                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
                            >
                                <h3 className="font-semibold text-gray-800 dark:text-white">{issue.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{issue.description}</p>
                                <div className="mt-3 flex gap-4 items-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${issue.status === 'open'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                        {issue.status}
                                    </span>
                                    <time className="text-xs text-gray-500">
                                        {new Date(issue.createdAt).toLocaleDateString()}
                                    </time>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">No issues found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default IssuesPageExample;
