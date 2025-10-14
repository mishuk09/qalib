import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem("adminToken"); // Check if the token exists

    return token ? <Element {...rest} /> : <Navigate to="/register" replace />;
};

export default AdminProtectedRoute;
