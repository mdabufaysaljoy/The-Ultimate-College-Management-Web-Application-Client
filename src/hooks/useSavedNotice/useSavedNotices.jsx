import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
const useSavedNotices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: savedNoticeByEmail = [], refetch: refetchSavedNoticeByEmail } =
    useQuery({
      queryKey: ["savedNotice", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
        // console.log('queryfn run');
        const response = await axiosSecure(
          `/saveNotice/find-by-email?email=${user?.email}`
        );
        // console.log(response.data);
        return response.data;
      },
    });
  // console.log(savedNoticeByEmail);
  return [savedNoticeByEmail, refetchSavedNoticeByEmail];
};

export default useSavedNotices;
