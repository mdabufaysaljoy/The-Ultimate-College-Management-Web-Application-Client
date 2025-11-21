import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import DarkMode from "../DarkMode/DarkMode";
import useAuth from "../../hooks/useAuth/useAuth";
import NavProfile from "./NavProfile";
import NavDropdown from "./NavDropdown";
import useAdmin from "../../hooks/useAdmin/useAdmin";
const Navbar = () => {
  const { user, loading } = useAuth();
  const [isAdmin] = useAdmin();
  return (
    <>
      <div className="w-full  sticky top-0 z-10 backdrop-blur-sm bg-brand-blue/90 text-white font-heading">
        <div className="max-w-7xl mx-auto navbar">
          <div className="navbar-start">
            <Link to="/">
              <img src={Logo} alt="" className="w-12 md:w-22" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "bg-gray-900" : "")}
                >
                  Home
                </NavLink>
              </li>
              {user && (
                <li>
                  <NavLink
                    to={
                      isAdmin
                        ? "/dashboard/admin/profile"
                        : "/dashboard/student/profile"
                    }
                    className={({ isActive }) =>
                      isActive ? "bg-gray-900" : ""
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "bg-gray-900" : "")}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/departments"
                  className={({ isActive }) => (isActive ? "bg-gray-900" : "")}
                >
                  Departments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all-notices"
                  className={({ isActive }) => (isActive ? "bg-gray-900" : "")}
                >
                  All Notices
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "bg-gray-900" : "")}
                >
                  Contacts
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end gap-2 lg:gap-8">
            <NavDropdown></NavDropdown>
            <DarkMode></DarkMode>
            {loading ? (
              <div className="loading"></div>
            ) : user ? (
              <NavProfile user={user}></NavProfile>
            ) : (
              <div className="join">
                <Link
                  to="/login"
                  className="btn btn-sm md:btn-md join-item btn-primary"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-sm md:btn-md join-item btn-success text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
