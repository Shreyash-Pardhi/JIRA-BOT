import React, { Suspense } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { RegisterForm } from '../components/auth/RegisterForm';
import { LoadingSkeleton } from '../components/common/Loading';

export const RegisterPage: React.FC = () => {
    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join our platform to get started"
            footerText="Already have an account?"
            footerLink={{ text: 'Sign in', href: '/login' }}
        >
            <Suspense fallback={<LoadingSkeleton />}>
                <RegisterForm />
            </Suspense>
        </AuthLayout>
    );
};
