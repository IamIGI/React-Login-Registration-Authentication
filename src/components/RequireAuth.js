import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import jwt_decode from 'jwt-decode';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const decoded = auth?.accessToken ? jwt_decode(auth?.accessToken) : undefined;

    const roles = decoded?.UserInfo?.roles || [];

    //outlet allows to render all child components, state allows to come back to prev. page
    return (
        <>
            {roles?.find((role) => allowedRoles?.includes(role)) ? (
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
