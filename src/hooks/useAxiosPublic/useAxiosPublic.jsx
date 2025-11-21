import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://the-ultimate-college-management-web.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
