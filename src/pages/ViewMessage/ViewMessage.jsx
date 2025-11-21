import { useLocation, useNavigate } from "react-router-dom";
import useContactMessage from "../../hooks/useContactMessage/useContactMessage";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const ViewMessage = () => {
  const { state: message } = useLocation();
  const navigate = useNavigate();
  const [_, refetchContactMessages] = useContactMessage();
  const axiosSecure = useAxiosSecure();
  const handleMessageDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`/contact/${id}`);
      if (response.data.success) {
        refetchContactMessages();
        navigate("/dashboard/admin/contact-message");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center">View Message</h1>
      <div
        key={message._id}
        className="overflow-x-auto rounded-box border border-base-content/5 shadow-xl bg-amber-100 text-black p-4 mt-8"
      >
        <div className="flex w-full justify-between items-center">
          <h3 className="text-lg font-bold">{message?.name}</h3>
          <p>{message?.email}</p>
          <button
            onClick={() => handleMessageDelete(message._id)}
            className="btn btn-error text-white btn-sm"
          >
            Remove
          </button>
        </div>
        <span className="divider divider-neutral"></span>
        <pre className="break-words whitespace-pre-wrap">{message?.message}</pre>
      </div>
    </div>
  );
};

export default ViewMessage;
