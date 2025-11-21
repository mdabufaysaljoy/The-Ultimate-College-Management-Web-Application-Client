import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminPostedNotice = ({ onNoticePost }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: adminPostedNotice = [], refetch } = useQuery({
    queryKey: ["adminPostedNotice", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(
          `/notices/admin-posted-notice?email=${user?.email}`
        );
        return response.data || [];
      } catch (error) {
        console.log(error.message);
      }
    },
  });
  onNoticePost(refetch);
  const handleDeleteNotice = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then(async (res) => {
      if (res.isConfirmed) {
        const response = await axiosSecure.delete(
          `/notices/delete-notice/${id}`
        );
        if (response.data.deletedCount > 0) {
          refetch();
        }
      }
    });
  };
  return (
    <div className="py-12">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Notices You've Posted
      </h1>
      <div className="pt-8">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Importance Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminPostedNotice.map((notice, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td className="font-semibold capitalize">
                    <Link to={`/view-notice/${notice._id}`} state={notice}>
                      {notice.title}
                    </Link>
                  </td>
                  <td className="capitalize">{notice.importanceType}</td>
                  <td>
                    <div className="join">
                      <button
                        onClick={() => handleDeleteNotice(notice._id)}
                        className="join-item btn text-white btn-sm btn-error"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/edit-notice/${notice._id}`}
                        state={notice}
                        className="join-item btn text-white btn-sm btn-info"
                      >
                        Edit
                      </Link>
                    </div>
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

export default AdminPostedNotice;
