import { useMemo } from "react";
// import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
import useNotice from "../../hooks/useNotice/useNotice";
// import { BookmarkCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSavedNotices from "../../hooks/useSavedNotice/useSavedNotices";

const SavedNotice = () => {
  // const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const Notices = useNotice();
  const [savedNotices, refetchSavedNoticeByEmail] = useSavedNotices();
  const filteredSavedNotices = useMemo(() => {
    return Notices.filter((notice) =>
      savedNotices.some((savedNotice) => notice._id === savedNotice.noticeId)
    );
  }, [Notices, savedNotices]);

  const removeBookMark = async (id) => {
    try {
      const response = await axiosSecure.delete(`/saveNotice/${id}`);
      console.log(response.data);
      refetchSavedNoticeByEmail();
    } catch (error) {
      console.log(error);
    }
  };
  const noticeHasBeenDeleted = parseInt(
    savedNotices?.length - filteredSavedNotices?.length
  );
  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold text-center">Saved Notices</h1>
      <div role="alert" className="alert alert-error alert-soft my-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-error h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{noticeHasBeenDeleted} notices has been deleted by Admin.</span>
      </div>
      <div className="pb-8">
        <div className="overflow-x-auto border p-4 rounded-2xl">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Importance Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSavedNotices.map((notice, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td className="capitalize font-semibold">
                    <Link to={`/view-notice/${notice._id}`} state={notice}>
                      {notice.title}
                    </Link>
                  </td>
                  <td className="capitalize">{notice.importanceType}</td>
                  <td>
                    <button
                      onClick={() => removeBookMark(notice._id)}
                      className="btn btn-error text-white"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SavedNotice;
