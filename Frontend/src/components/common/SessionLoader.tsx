import { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const SessionLoader: React.FC = () => {
    const { setUser, setLoading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const initialCheckDone = useRef(false);

    useEffect(() => {
        // Only do the initial session restore on first mount
        if (initialCheckDone.current) {
            return;
        }

        const restoreSession = async () => {
            try {
                setLoading(true);
                const response = await authService.getCurrentUser();
                setUser(response ?? null);

                // If user is logged in and on auth pages, redirect to home
                if (response) {
                    const isAuthPage = ['/login', '/register'].includes(location.pathname);
                    if (isAuthPage) {
                        navigate('/home', { replace: true });
                    }
                }
            } catch (err) {
                console.error('Session restoration failed:', err);
                setUser(null);
                // If not logged in, allow login/register pages to be displayed
            } finally {
                setLoading(false);
                initialCheckDone.current = true;
            }
        };

        restoreSession();
    }, []); // Empty dependency array - only run once on mount

    return null;
};

export default SessionLoader;
