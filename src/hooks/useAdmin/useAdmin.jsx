import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin = false, isPending: isAdminPending } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/isAdmin/${user.email}`);
      // console.log(res.data);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminPending];
};

export default useAdmin;
