import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const EditAdminPostedNotice = () => {
  const { state: notice } = useLocation();
  const [changedForm, setChangedForm] = useState({ ...notice });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setChangedForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const response = await axiosSecure.patch(
      `/notices/edit-notice/${notice._id}`,
      changedForm
    );
    if (response.statusText === "OK") {
      Swal.fire({
        title: response.data.message,
        icon: "success",
      });
      navigate('/post-notice')
    } else {
      Swal.fire({
        title: "Something Went Wrong",
        icon: "error",
      });
    }
  };
  return (
    <div className="py-12">
      <h1 className="text-4xl font-black text-center">Edit Notice</h1>
      <div className="mt-10  lg:w-1/2 mx-auto">
        <form
          onSubmit={handleOnSubmit}
          className="bg-brand-navyblue/70 px-4 py-8 text-white rounded-2xl shadow shadow-white/80 flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-lg">
                Title:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="outline-none bg-white text-black px-2 py-1 rounded-md w-full text-lg"
                value={changedForm.title}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="importanceType">
                Importance Type:<span className="text-red-500">*</span>
              </label>
              <select
                name="importanceType"
                id="importanceType"
                className="bg-white text-black w-full rounded-md text-lg px-2 py-1"
                value={changedForm.importanceType}
                onChange={handleOnChange}
              >
                <option value="">select</option>
                <option value="most important">Most Important</option>
                <option value="informative">Informative</option>
                <option value="ignoreable">Ignorable</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="description">
                Description:<span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                className="bg-white text-black w-full rounded-md text-lg px-2 py-1"
                rows={5}
                value={changedForm.description}
                onChange={handleOnChange}
              ></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Update Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAdminPostedNotice;
