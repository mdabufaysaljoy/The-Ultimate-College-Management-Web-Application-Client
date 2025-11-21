import { Link, useLocation } from "react-router-dom";
const Breadcumps = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumbs text-sm ms-20">
      <ul>
        {/* <li>
          <Link to="/dashboard/admin">Dashboard</Link>
        </li> */}
        {pathnames.map((value, idx) => {
          const path = "/" + pathnames.slice(0, idx + 1).join("/");
          const label = value.replace(/-/, " ");
          return (
            <li className="capitalize" key={idx}>
              {idx + 1 === pathnames.length ? (
                <label>{label}</label>
              ) : (
                <Link to={path}>{label}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcumps;
