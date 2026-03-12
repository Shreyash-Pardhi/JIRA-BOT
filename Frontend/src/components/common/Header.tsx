import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';
import { LogOutIcon } from '../icons';

const Header = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await authService.logout();
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
                <div
                    className="flex items-center gap-3"
                    onClick={() => navigate('/home')}
                >
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">JB</span>
                    </div>
                    <span className="font-bold text-xl text-gray-900">JiraBot</span>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-500 leading-tight">{user?.email}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                            {user?.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2"
                    >
                        <LogOutIcon />
                        Logout
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Header