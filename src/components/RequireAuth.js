import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    //outlet allows to render all child components, state allows to come back to prev. page
    return (
        <>
            {auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
                <Outlet />
            ) : auth?.user ? (
                <Navigate to="/unauthorized" state={{ from: location }} replace />
            ) : (
                <Navigate to="/login" state={{ from: location }} replace />
            )}
        </>
    );
};

export default RequireAuth;
