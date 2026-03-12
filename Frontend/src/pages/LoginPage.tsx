import React, { Suspense } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';
import { LoadingSkeleton } from '../components/common/Loading';

export const LoginPage: React.FC = () => {
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your account to continue"
            footerText="Don't have an account?"
            footerLink={{ text: 'Sign up', href: '/register' }}
        >
            <Suspense fallback={<LoadingSkeleton />}>
                <LoginForm />
            </Suspense>
        </AuthLayout>
    );
};
