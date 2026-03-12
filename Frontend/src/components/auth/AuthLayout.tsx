import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    footerText?: string;
    footerLink?: { text: string; href: string };
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    title,
    subtitle,
    footerText,
    footerLink,
}) => {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">JB</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-gray-600 text-base leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-12 mb-8 border border-gray-100">
                    {children}
                </div>

                {/* Footer */}
                {footerText && footerLink && (
                    <p className="text-center text-sm text-gray-600 mb-8 font-medium">
                        {footerText}{' '}
                        <Link
                            to={footerLink.href}
                            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                            {footerLink.text}
                        </Link>
                    </p>
                )}

                {/* Decorative elements */}
                <div className="mt-14 text-center text-xs text-gray-500">
                    <p>© 2024 JiraBot. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};
