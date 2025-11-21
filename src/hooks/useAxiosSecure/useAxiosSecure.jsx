import axios from "axios";
import useAuth from "../useAuth/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const axiosSecure = axios.create({
  baseURL: "https://the-ultimate-college-management-web.onrender.com",
});
const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        // console.log(token);
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        const status = err.response.status;
        console.log(
          "error in response interseptors status code:",
          err.response.data,
          status
        );
        if (status === 401 || status === 403) {
          logout();
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logout, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
