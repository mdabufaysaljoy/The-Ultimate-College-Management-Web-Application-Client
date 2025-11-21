import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import useAdmin from "../../hooks/useAdmin/useAdmin";
import Swal from "sweetalert2";

const AdminRoute = ({children}) => {
  const { pathname } = useLocation();
  const { user, loading } = useAuth();
    const [isAdmin, isAdminPending] = useAdmin();
     if (loading || isAdminPending) {
       return (
         <div className="w-full h-screen flex justify-center items-center">
           <div className="loading loading-xl"></div>
         </div>
       );
    }
    if (user && isAdmin) {
        return children
  }
  Swal.fire({
    title: "Only Admin Can Access This Route!",
    icon: 'warning',
    timer: 1500
  })
  return <Navigate to="/" state={pathname} />;
};

export default AdminRoute;
