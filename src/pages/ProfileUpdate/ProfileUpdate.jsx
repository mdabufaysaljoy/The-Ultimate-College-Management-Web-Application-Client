import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import useUsername from "../../hooks/useUsername/useUsername";
import { useEffect } from "react";
const image_upload_api_key = import.meta.env.VITE_IMAGE_UPLOAD_API_KEY;
const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_api_key}`;
const ProfileUpdate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { handleFirebaseProfileUpdate } = useAuth();
  const [findUsername, refetchFindUsername] = useUsername();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: state?.name,
      username: state?.name.split(" ").join("").toLowerCase(),
    },
  });
  const onSubmit = async (data) => {
    const { username, name, profilePicture } = data;
    const imageFile = new FormData();
    imageFile.append("image", profilePicture[0]);

    try {
      if (profilePicture.length) {
        const imgRes = await axiosPublic.post(image_upload_url, imageFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const photoURL = imgRes.data.success && imgRes.data.data.display_url;
        handleFirebaseProfileUpdate(name, photoURL);
        const postDoc = { username, name, photoURL };
        const updateDB = await axiosSecure.patch(
          `/users/update/${state?.email}`,
          postDoc
        );
        if (updateDB.data.success) {
          Swal.fire({
            title: updateDB.data.message,
            icon: "success",
            timer: 1500,
          });
          refetchFindUsername();
          navigate("/profile");
        }
      } else {
        handleFirebaseProfileUpdate(name);
        const postDoc = { username, name };
        const updateDB = await axiosSecure.patch(
          `/users/update/${state?.email}`,
          postDoc
        );
        if (updateDB.data.success) {
          Swal.fire({
            title: updateDB.data.message,
            icon: "success",
            timer: 1500,
          });
          refetchFindUsername();
          navigate("/profile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (findUsername.success) {
      reset({
        name: state?.name,
        username: findUsername.username,
      });
    }
  }, [findUsername, state, reset]);
  return (
    <div className="py-10">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li>Update Profile</li>
        </ul>
      </div>
      <h1 className="text-3xl font-bold text-center">Update Profile</h1>
      <div className="w-full flex justify-center mt-6">
        <div className="lg:w-1/2 bg-brand-blue p-6 rounded-lg">
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                id="username"
                className="border-none outline-none bg-white text-black rounded-md py-1 px-2"
                {...register("username", {
                  minLength: 3,
                  maxLength: 22,
                  pattern: /^[a-z0-9_]{3,22}$/,
                })}
              />
              {errors.username?.type === "minLength" && (
                <p className="text-error">
                  username must be at least 3 characters
                </p>
              )}
              {errors.username?.type === "maxLength" && (
                <p className="text-error">
                  username must be less than 22 characters
                </p>
              )}
              {errors.username?.type === "pattern" && (
                <p className="text-error">you can use only a-z, 0-9, _</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                id="name"
                className="border-none outline-none bg-white text-black rounded-md py-1 px-2"
                {...register("name", {
                  minLength: 3,
                  maxLength: 22,
                  pattern: /^[A-Z a-z]{3,22}$/,
                })}
              />
              {errors.name?.type === "minLength" && (
                <p className="text-error">name must be at least 3 characters</p>
              )}
              {errors.name?.type === "maxLength" && (
                <p className="text-error">
                  name must be less than 22 characters
                </p>
              )}
              {errors.name?.type === "pattern" && (
                <p className="text-error">you can use only Letters</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="profilePicture">Profile Picture: </label>
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                className="file-input border-none  outline-none bg-white text-black rounded-md py-1 px-2"
                accept="image/jpg, image/png, image/jpeg"
                {...register("profilePicture")}
              />
            </div>
            <button className="btn btn-success text-white w-full mt-4 ">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
