import { Bookmark, BookmarkCheck } from "lucide-react";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import useSavedNotices from "../../hooks/useSavedNotice/useSavedNotices";

const ViewNotice = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { state } = useLocation();
  const { announcedBy, description, importanceType, publishDate, title, _id } =
    state;
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [savedCount, setSavedCount] = useState(0);
  const { data: savedCount = 0, refetch: refetchSavedCount } = useQuery({
    queryKey: ["savedCount"],
    enabled: !!_id,
    queryFn: async () => {
      const response = await axiosPublic.get(`/saveNotice/saveCount/${_id}`);
      return response.data.savedCount;
    },
  });
  const [_, refetchSavedNoticeByEmail] = useSavedNotices();
  const handleSaveNotice = async (id) => {
    const saveNoticeDoc = {
      noticeId: id,
      email: user.email,
    };
    await axiosSecure.post("/saveNotice", saveNoticeDoc);
    setIsSaved((prev) => !prev);
    refetchSavedCount();
    refetchSavedNoticeByEmail();
  };

  useEffect(() => {
    async function checkSavedStatus() {
      setIsLoading(true);
      if (!user) {
        return;
      }
      try {
        const res = await axiosSecure.get(
          `/saveNotice/${_id}?email=${user.email}`
        );
        setIsSaved(res.data?.isSaved);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    checkSavedStatus();
  }, [user, _id, axiosSecure]);
  return (
    <div className="py-12 space-y-8">
      <h1 className="text-2xl text-center">View Full Notice</h1>
      <div className="bg-yellow-100 text-black p-8 rounded-md space-y-4  mx-auto">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex flex-col md:flex-row gap-3 justify-between capitalize">
          <h4>
            <span className="font-semibold">Published Date:</span> {publishDate}
          </h4>
          <h4>
            <span className="font-semibold">Importance Type:</span>{" "}
            {importanceType}
          </h4>
          <h4>
            <span className="font-semibold">Announced By:</span>{" "}
            {announcedBy || "Unknown"}
          </h4>
        </div>
        <div>
          <span className="font-bold">Saved Count: </span>
          {savedCount}
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-bold">Description: </span>
          <pre className="whitespace-pre-wrap break-words">{description}</pre>
        </div>
        <button
          disabled={!user}
          onClick={() => handleSaveNotice(_id)}
          className="btn w-full btn-primary"
        >
          {isLoading ? (
            <span className="loading"></span>
          ) : isSaved ? (
            <BookmarkCheck />
          ) : (
            <Bookmark />
          )}
          {isSaved ? "Saved" : "Save The Notice"}
        </button>
      </div>
    </div>
  );
};

export default ViewNotice;
