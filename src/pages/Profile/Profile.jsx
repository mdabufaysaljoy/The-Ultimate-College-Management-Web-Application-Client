import useAuth from "../../hooks/useAuth/useAuth";
import UserIcon from "../../assets/userIcon.png";
import TimeAgo from "../../components/TimeAgo/TimeAgo";
import { Link } from "react-router-dom";
import useUsername from "../../hooks/useUsername/useUsername";
import { useEffect, useState } from "react";
import useAdmin from "./../../hooks/useAdmin/useAdmin";

const Profile = () => {
  const { user, handleEmailVerification } = useAuth();
  const [username, setUsername] = useState("");
  const [isAdmin] = useAdmin();
  const [findUsername] = useUsername();
  useEffect(() => {
    if (findUsername.success) {
      setUsername(findUsername.username);
    } else {
      setUsername(user?.displayName.split(" ").join("").toLowerCase());
    }
  }, [findUsername, user]);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full lg:w-1/2 bg-brand-blue p-8 space-y-4 rounded-2xl flex flex-col justify-center items-center">
        {user?.photoURL ? (
          <img src={user?.photoURL} alt="" className="rounded-full size-60" />
        ) : (
          <img
            src={UserIcon}
            alt=""
            className="rounded-full size-60 cursor-pointer"
          />
        )}
        <div className="flex items-center gap-5">
          <h3 className="text-3xl font-bold capitalize">{user?.displayName}</h3>
          <span className="bg-emerald-500 px-2 rounded-lg font-semibold self-end">{isAdmin ? "Admin" : "Student"}</span>
        </div>
        <div className="self-start flex flex-col gap-2 w-full">
          <p className="text-lg">
            <span className="font-bold">Username: </span>
            {username}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <p className="text-lg">
              <span className="font-bold">Email:</span> {user?.email}
            </p>
            <span className="badge badge-success text-black text-sm">
              {user?.emailVerified ? "Verified" : "Non-verified"}
            </span>
          </div>
          <p className="text-lg">
            <span className="font-bold">User created at:</span>{" "}
            <TimeAgo dateString={user?.metadata.creationTime}></TimeAgo>
          </p>
          <p className="text-lg">
            <span className="font-bold">Last sign in at:</span>{" "}
            <TimeAgo dateString={user?.metadata.lastSignInTime}></TimeAgo>
          </p>
          <p className="text-lg">
            <span className="font-bold">Provider:</span>{" "}
            {user?.providerData[0].providerId}
          </p>
          <div className="w-full">
            {!user?.emailVerified && (
              <button
                onClick={handleEmailVerification}
                className="btn w-full mx-auto"
              >
                Get email to be Verified
              </button>
            )}
          </div>
        </div>
      </div>
      <Link
        to="/profile/update"
        state={{ name: user?.displayName, email: user?.email }}
        className="btn btn-secondary w-full lg:w-1/2 mt-4"
      >
        Update Profile
      </Link>
    </div>
  );
};

export default Profile;
