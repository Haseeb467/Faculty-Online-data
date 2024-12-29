import { Navigate } from 'react-router-dom';
import { useAuth } from '@/Contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { currentUser, role } = useAuth();

    if (!currentUser || role?.toLowerCase() !== requiredRole.toLowerCase()) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;