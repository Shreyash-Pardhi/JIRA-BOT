import { lazy } from 'react';

// Lazy load pages for code splitting
export const LoginPage = lazy(() => import('../pages/LoginPage').then(m => ({ default: m.LoginPage })));
export const RegisterPage = lazy(() => import('../pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
export const HomePage = lazy(() => import('../pages/HomePage').then(m => ({ default: m.HomePage })));
export const ChatbotPage = lazy(() => import('../pages/ChatbotPage').then(m => ({ default: m.ChatbotPage })));
