import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/auth.service';
import Button from '../common/Button';
import Input from '../common/Input';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '../icons';

export const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    // Redirect to home if authenticated
    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const validateForm = useCallback(() => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        } else if (name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!agreedToTerms) {
            newErrors.terms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [name, email, password, confirmPassword, agreedToTerms]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await authService.register({ name, email, password });
            setUser(response.user);
            // Navigation is handled by useEffect when user is set
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Registration failed';
            setErrors({ email: errorMessage });
        } finally {
            setIsLoading(false);
        }
    }, [name, email, password, validateForm, setUser]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                placeholder="John Doe"
                icon={<UserIcon />}
                disabled={isLoading}
            />

            <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="you@example.com"
                icon={<EnvelopeIcon />}
                disabled={isLoading}
            />

            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                placeholder="••••••••"
                icon={<LockClosedIcon />}
                disabled={isLoading}
            />

            <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                placeholder="••••••••"
                icon={<LockClosedIcon />}
                disabled={isLoading}
            />

            <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer mt-1 flex-shrink-0"
                        disabled={isLoading}
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                        I agree to the{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                            Privacy Policy
                        </a>
                    </span>
                </label>
                {errors.terms && (
                    <p className="text-sm text-red-600 font-medium mt-2">{errors.terms}</p>
                )}
            </div>

            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
            >
                Create Account
            </Button>
        </form>
    );
};
