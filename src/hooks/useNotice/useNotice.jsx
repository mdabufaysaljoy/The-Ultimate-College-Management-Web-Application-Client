import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useNotice = () => {
  const axiosSecure = useAxiosSecure();
  const { data: Notices = [] } = useQuery({
    queryKey: ["Notices"],
    queryFn: async () => {
        const response = await axiosSecure.get("/notices/load-all-notices");
        // console.log(response.data);
      return response.data;
    },
  });
//   console.log(Notices);
  return Notices;
};

export default useNotice;
