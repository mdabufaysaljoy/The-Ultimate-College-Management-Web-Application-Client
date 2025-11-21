import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAdmin from "./../useAdmin/useAdmin";

const useContactMessage = () => {
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  // console.log(isAdmin);
  const { data: contactMessages = [], refetch: refetchContactMessages } =
    useQuery({
      queryKey: ["contactMessage"],
      enabled: !!isAdmin,
      queryFn: async () => {
        const response = await axiosSecure.get("/contact");
        //   console.log(response);
        if (response.data.success) {
          return response.data.response;
        }
      },
    });
  return [contactMessages, refetchContactMessages];
};

export default useContactMessage;
