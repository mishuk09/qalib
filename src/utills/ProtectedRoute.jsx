import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem("token"); // Check if the token exists

    return token ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
