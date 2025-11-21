import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Breadcumps from "../../components/Breadcumps/Breadcumps";
import useAdmin from "./../../hooks/useAdmin/useAdmin";
import { useEffect } from "react";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAdminLoading) return;
    if (location.pathname === "/dashboard") {
      if (isAdmin) {
        navigate("/dashboard/admin/profile");
      } else {
        navigate("/dashboard/student/profile");
      }
    }
  }, [isAdmin, isAdminLoading, navigate, location.pathname]);
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mt-6 space-y-4">
        <Breadcumps></Breadcumps>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
