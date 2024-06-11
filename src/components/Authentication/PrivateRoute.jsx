import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    // const [user, loading] = useAuthState(auth);
    const authAdmin = useSelector(state => {
        return state.admin.authAdmin;
    });
    const location = useLocation();

    if (!authAdmin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default PrivateRoute;
