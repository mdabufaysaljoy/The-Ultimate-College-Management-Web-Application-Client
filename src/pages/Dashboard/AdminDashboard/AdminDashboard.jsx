import { NavLink, Outlet } from "react-router-dom";
import useSavedNotices from "../../../hooks/useSavedNotice/useSavedNotices";
import useContactMessage from "../../../hooks/useContactMessage/useContactMessage";

const AdminDashboard = () => {
  const [savedNoticeByEmail] = useSavedNotices();
  const [contactMessages] = useContactMessage();
  return (
    <div className="grid grid-cols-12 divide-x">
      <div className="col-span-3 w-full  px-4 ">
        <div className="w-full bg-brand-blue h-screen rounded text-white">
          <ul className="menu menu-vertical px-1 w-full gap-1">
            <li>
              <NavLink
                to={"profile"}
                className={({ isActive }) => (isActive ? "bg-black" : "")}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"all-users"}
                className={({ isActive }) => (isActive ? "bg-black" : "")}
              >
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"savedNotices"}
                className={({ isActive }) => (isActive ? "bg-black" : "")}
              >
                Saved Notices{" "}
                <span className="badge">{savedNoticeByEmail.length}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"set-tution-fees"}
                className={({ isActive }) => (isActive ? "bg-black" : "")}
              >
                Set Tution Fees
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"contact-message"}
                className={({ isActive }) => (isActive ? "bg-black" : "")}
              >
                Contact Messages{" "}
                <span className="badge">{contactMessages.length}</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"payment-history"}
                className={({ isActive }) => (isActive ? "bg-black" : "")}
              >
                Payment History
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-9 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
