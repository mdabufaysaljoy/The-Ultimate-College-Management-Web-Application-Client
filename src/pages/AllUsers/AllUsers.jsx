import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../hooks/useAxiosSecure/useAxiosSecure";
import { EditIcon, TrashIcon } from "lucide-react";
import Swal from "sweetalert2";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import UniversalPaginate from "../../components/UniversalPaginate/UniversalPaginate";
import UniversalSelectLimit from "../../components/UniversalSelectLimit/UniversalSelectLimit";
const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortRole, setSortRole] = useState("");
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", currentPage, itemsPerPage, pageCount, sortRole],
    queryFn: async () => {
      const pageCountForBackend = currentPage + 1;
      const res = await axiosSecure.get(
        `/users?page=${pageCountForBackend}&limit=${itemsPerPage}&sortByRole=${sortRole}`
      );
      setPageCount(res.data.pageCount);
      return res.data.allUsers;
    },
  });
  const setLimit = (event) => {
    const value = parseInt(event.target.value);
    setItemsPerPage(value);
  };
  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-error text-white mx-2",
        cancelButton: "btn btn-info text-white mx-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/users/${id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              swalWithBootstrapButtons.fire({
                title: "Deleted Successful",
                icon: "success",
              });
              refetch();
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };
  const handleMakeAdmin = async (id) => {
    const makeAdminRes = await axiosSecure.patch(`/users/makeAdmin/${id}`);
    // console.log(makeAdminRes.data);
    if (makeAdminRes.data.acknowledged) {
      Swal.fire({
        title: "user role changed successfully!",
        icon: "success",
        timer: 1500,
      });
    }
    refetch();
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const handleSortByRole = (event) => {
    setSortRole(event.target.value);
  };
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl md:text-4xl font-bold">
          Total Users: {users.length || "0"}
        </h1>
        <div className="flex gap-4 mt-6 items-center">
          <UniversalSelectLimit setLimit={setLimit} />
          <div className="md:text-lg flex gap-2">
            Sort:{" "}
            <select
              name="sortByRole"
              id="sortByRole"
              className="bg-white text-black rounded-md md:px-2 md:py-1"
              defaultValue=""
              onChange={handleSortByRole}
            >
              <option value="">All</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto p-8">
        <table className="table border border-gray-500">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="btn"
                  >
                    {user.role === "admin" ? "Admin" : "Student"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="cursor-pointer"
                  >
                    <TrashIcon color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UniversalPaginate
        pageCount={pageCount}
        handlePageClick={handlePageClick}
      />
    </div>
  );
};

export default AllUsers;
