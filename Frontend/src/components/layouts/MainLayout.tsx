import React from 'react';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
    children?: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = () => {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Content - Dynamic (reloads on route change, but layout persists) */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};
