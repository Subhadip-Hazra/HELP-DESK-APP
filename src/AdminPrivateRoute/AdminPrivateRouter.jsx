/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Loading from "../Components/Loading";
import { admin } from "../constants";

const AdminPrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div><Loading/></div>
        );
    }

    const isAdmin = admin.some(adminUser => adminUser.adminEmail === user?.email);

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default AdminPrivateRoute;
