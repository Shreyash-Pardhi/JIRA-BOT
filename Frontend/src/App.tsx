import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import SessionLoader from './components/common/SessionLoader';
import { LoginPage, RegisterPage, HomePage, ChatbotPage } from './pages';
import { LoadingSpinner } from './components/common/Loading';
import { PrivateRoute } from './components/common/PrivateRoute';
import { MainLayout } from './components/layouts/MainLayout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SessionLoader />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Auth Routes - No Layout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes with Persistent Layout */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route path="home" element={<HomePage />} />
              <Route path="chatbot" element={<ChatbotPage />} />
              <Route index element={<Navigate to="home" replace />} />
              {/* Add more routes here - they will all use MainLayout */}
            </Route>

            {/* Default redirects */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
