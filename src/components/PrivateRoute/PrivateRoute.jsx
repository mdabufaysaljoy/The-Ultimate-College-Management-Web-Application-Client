import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const {pathname} = useLocation();
    if (loading) {
        return <div className="w-full h-screen flex justify-center items-center">
            <div className="loading loading-xl"></div>
        </div>
    }
    if (!user) {
        Swal.fire({
            title: "Please Login to access the route",
            icon: "warning",
            timer:1500
        })
        return <Navigate to="/login" state={pathname} />;
    }
    return children
  
};

export default PrivateRoute;