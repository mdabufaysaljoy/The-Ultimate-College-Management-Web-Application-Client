import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import useAdmin from '../../hooks/useAdmin/useAdmin';

const NavDropdown = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
    return (
      <div className="dropdown dropdown-center">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />{" "}
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-brand-blue rounded-box z-1 mt-3 w-56 px-4 shadow divide-y "
        >
          <li className='py-2'> 
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "bg-gray-900 py-2" : "py-2")}
            >
              Home
            </NavLink>
          </li>
          {user && (
            <li className='py-2'>
              <NavLink
                to={isAdmin ? "/dashboard/admin/profile" : "/dashboard/student/profile"}
                className={({ isActive }) => (isActive ? "bg-gray-900 py-2" : "py-2")}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          <li className='py-2'>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "bg-gray-900 py-2" : "py-2")}
            >
              About
            </NavLink>
          </li>
          <li className='py-2'>
            <NavLink
              to="/departments"
              className={({ isActive }) => (isActive ? "bg-gray-900 py-2" : "py-2")}
            >
              Departments
            </NavLink>
          </li>
          <li className='py-2'>
            <NavLink
              to="/all-notices"
              className={({ isActive }) => (isActive ? "bg-gray-900 py-2" : "py-2") }
            >
              All Notices
            </NavLink>
          </li>
          <li className='py-2'>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "bg-gray-900 py-2" : "py-2")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    );
};

export default NavDropdown;