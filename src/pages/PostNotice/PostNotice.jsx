import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import AdminPostedNotice from "./AdminPostedNotice";

const PostNotice = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  
  const onSubmit = async (data) => {
    const publishDate = new Date().toDateString();
    const newDataObj = {
      publishDate,
      ...data,
      announcedBy: user.displayName,
      email: user?.email,
    };
    try {
      const postRes = await axiosSecure.post("/notices", newDataObj);
      if (postRes.status === 201) {
        // onRefetch();
        Swal.fire({
          title: "New notice posted successful!",
          icon: "success",
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const adminPostedNoticeRefetchFn = (refetch) => {
    refetch();
  };
  return (
    <div className="py-12">
      <h1 className="text-2xl md:text-4xl font-black text-center">Post A Notice</h1>
      <div className="mt-10  lg:w-1/2 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
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
                {...register("title", { required: true, minLength: 6 })}
              />
            </div>
            {errors.title?.type === "required" && (
              <p className="text-red-500">Title is required</p>
            )}
            {errors.title?.type === "minLength" && (
              <p className="text-red-500">Title must be minimum 6 character</p>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <label htmlFor="importanceType">
                Importance Type:<span className="text-red-500">*</span>
              </label>
              <select
                defaultValue="select"
                name="importanceType"
                id="importanceType"
                className="bg-white text-black w-full rounded-md text-lg px-2 py-1"
                {...register("importanceType", {
                  required: true,
                })}
              >
                <option value="">select</option>
                <option value="most important">Most Important</option>
                <option value="informative">Informative</option>
                <option value="ignoreable">Ignorable</option>
              </select>
            </div>
            {errors.importanceType?.type === "required" && (
              <p className="text-red-500">Importance Type is required</p>
            )}
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
                {...register("description", {
                  required: true,
                })}
              ></textarea>
            </div>
            {errors.description?.type === "required" && (
              <p className="text-red-500">Description is required</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </form>
      </div>
      <div>
        <AdminPostedNotice
          onNoticePost={adminPostedNoticeRefetchFn}
        ></AdminPostedNotice>
      </div>
    </div>
  );
};

export default PostNotice;
