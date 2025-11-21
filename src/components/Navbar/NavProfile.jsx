import { NavLink } from "react-router-dom";
import UserIcon from "../../assets/userIcon.png";
import useAdmin from "../../hooks/useAdmin/useAdmin";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import useSavedNotices from "../../hooks/useSavedNotice/useSavedNotices";

const NavProfile = () => {
  // todo: load the isAdmin value from the database
  const [isAdmin] = useAdmin();
  const { user, logout } = useAuth();
  const [savedNoticeByEmail] = useSavedNotices();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((res) => {
      if (res.isConfirmed) {
        logout().then(() => {
          Swal.fire({
            title: "Logout Successfull!",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="dropdown dropdown-end ">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        {user?.photoURL ? (
          <img src={user?.photoURL} alt="" className="rounded-full" />
        ) : (
          <img
            src={UserIcon}
            alt=""
            className="rounded-full size-22 cursor-pointer"
          />
        )}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-brand-blue rounded-box z-1 mt-3 w-52 p-2 shadow divide-y divide-black "
      >
        {isAdmin ? (
          <>
            {" "}
            <li className="py-2">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 justify-between py-2"
                    : "justify-between py-2"
                }
                to="/profile"
              >
                Profile
                <span className="badge bg-green-500 border-none text-white">
                  Admin
                </span>
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink className="py-2" to="/all-users">
                All Users
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink className="py-2" to="/post-notice">
                Post Notice
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink className="py-2" to="/set-tution-fee">
                Set Tution Fees
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink className="py-2" to="/">
                Settings
              </NavLink>
            </li>
            <li className="py-2">
              <button className="py-2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li className="py-2">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-900 justify-between py-2"
                    : "justify-between py-2"
                }
                to="/profile"
              >
                Profile
                <span className="badge bg-green-500 border-none text-white">
                  Student
                </span>
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink className="py-2" to="/dashboard/student/results">
                Results
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink className="py-2 flex justify-between" to="/saved-notice">
                Saved Notices
                <span className="badge badge-accent text-white rounded-full">
                  {savedNoticeByEmail.length}
                </span>
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink className="py-2" to="/tution-fees">
                Tution Fees
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink className="py-2" to="/settings">
                Settings
              </NavLink>
            </li>
            <li className="py-2">
              <button className="py-2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavProfile;
