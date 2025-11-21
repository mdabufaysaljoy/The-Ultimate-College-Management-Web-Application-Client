import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useUsername = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: findUsername = {}, refetch: refetchFindUsername } = useQuery({
    queryKey: ["username", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/users/get-username/${user?.email}`
      );
      return response.data;
    },
  });
  return [findUsername, refetchFindUsername];
};

export default useUsername;
