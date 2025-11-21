import Lottie from "lottie-react";
import SignupJSON from "../../../assets/LottieJSON/Signup (1).json";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth/useAuth";
import { Link, Navigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import { useState } from "react";
import ReCaptcha from "../../../components/ReCaptcha/ReCaptcha";
import Swal from "sweetalert2";
const image_upload_api_key = import.meta.env.VITE_IMAGE_UPLOAD_API_KEY;
const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_api_key}`;
const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const [isValidCaptcha, setIsValidCaptcha] = useState(false);
  const {
    user,
    loading,
    handleGoogleLogin,
    handleGithubLogin,
    handleEmailSignup,
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loading loading-xl"></div>
      </div>
    );
  }
  if (user) {
    return <Navigate to="/"></Navigate>;
  }
  const handleFormSubmit = async (data) => {
    const { name, email, password, photo } = data;
    const imageFile = new FormData();
    imageFile.append("image", photo[0]);
    try {
      const imgRes = await axiosPublic.post(image_upload_url, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const displayURL = imgRes.data.data.display_url;
      handleEmailSignup(name, email, displayURL, password);
      const result = await axiosPublic.post("/users", { name, email });
      if (result.data.success) {
        Swal.fire({
          icon: "success",
          title: result.data.message,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log("imgbb image upload error", error.message);
    }
  };
  return (
    <div className="min-h-screen py-12">
      <h1 className="text-4xl font-bold text-center">SignUp Now!</h1>
      <div className="flex flex-row-reverse gap-12 items-center">
        <div className="bg-brand-blue px-8 py-14  rounded-2xl flex-4">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
            {/* name field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-lg text-white">
                Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="bg-white px-3 py-1 text-lg text-black rounded-md border-none outline-none"
                id="name"
                {...register("name", { required: true, minLength: 3 })}
                aria-invalid={errors.name ? "true" : "false"}
                placeholder="Jhon Doe"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
              {errors.name?.type === "minLength" && (
                <p className="text-red-500">
                  Name must be at least 3 characters
                </p>
              )}
            </div>
            {/* email field  */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-lg text-white">
                Email: <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="bg-white px-3 py-1 text-lg text-black rounded-md border-none outline-none"
                id="email"
                placeholder="example@mail.com"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  minLength: 4,
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
              {errors.email?.type === "minLength" && (
                <p className="text-red-500">
                  Email must be at least 4 characters
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-red-500">This is not right email pattern</p>
              )}
            </div>
            {/* photoURL field  */}
            <div className="flex flex-col gap-1">
              <label htmlFor="photo" className="text-lg text-white">
                Photo: <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                className="file-input bg-white text-lg text-black rounded-md border-none outline-none w-full"
                accept="image/jpg, image/png, image/jpeg"
                {...register("photo", { required: true })}
              />
              {/* <input
                type="url"
                name="photoURL"
                className="bg-white px-3 py-1 text-lg text-black rounded-md border-none outline-none"
                id="photoURL"
                {...register("photoURL", {
                  required: true,
                  pattern:
                    /\b((?:https?:\/\/)?(?:www\.)?[A-Za-z0-9.-]+\.[A-Za-z]{2,})(?:\/[^\s]*)?\b/i,
                })}
                aria-invalid={errors.photoURL ? "true" : "false"}
                placeholder="https://example.com/profile.png"
              />
              {errors.photoURL?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
              {errors.photoURL?.type === "pattern" && (
                <p className="text-red-500">This is not a right url</p>
              )} */}
            </div>
            {/* password field  */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-lg text-white">
                Enter Your Passwrod: <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                className="bg-white px-3 py-1 text-lg text-black rounded-md border-none outline-none"
                id="password"
                placeholder="AZaz09"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password should contain A-Z, a-z, 0-9
                </p>
              )}
            </div>
            {/* cpatcha field  */}
            <div className="py-2">
              <ReCaptcha onValidate={setIsValidCaptcha} />
            </div>
            {/* submit button  */}
            <button
              disabled={!isValidCaptcha}
              type="submit"
              className="btn bg-brand-navyblue text-white shadow-none border-none w-full mt-4"
            >
              Signup
            </button>
          </form>
          <div className="divider divider-neutral">or</div>
          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5] w-full"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Signup with Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="btn bg-black text-white border-black w-full"
            >
              <svg
                aria-label="GitHub logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                ></path>
              </svg>
              Signup with GitHub
            </button>
          </div>
          <div className="divider"></div>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Please login
            </Link>
          </p>
        </div>
        <div className="flex-8">
          <Lottie loop={true} animationData={SignupJSON}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Signup;
