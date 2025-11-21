import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useContactMessage from "../../hooks/useContactMessage/useContactMessage";

const ContactMessage = () => {
  const [contactMessages, refetchContactMessages] = useContactMessage();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleMessageDelete = async (id) => {
    try {
      const response = await axiosSecure.delete(`/contact/${id}`);
      if (response.data.success) {
        refetchContactMessages();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(contactMessages);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Contact Messages</h1>
      <div className="space-y-4">
        {contactMessages.map((message, idx) => (
          <div
            key={idx}
            className="overflow-x-auto rounded-box border border-base-content/5 shadow-xl bg-amber-100 text-black p-4 mt-8"
          >
            <div className="flex w-full justify-between items-center">
              <h3 className="text-lg font-bold">{message?.name}</h3>
              <p>{message?.email}</p>
              <div className="join">
                <button
                  onClick={() =>
                    navigate("/view-message/bujungbajungid",{state:message})
                  }
                  className="btn btn-success text-white join-item btn-sm"
                >
                  View Full
                </button>
                <button
                  onClick={() => handleMessageDelete(message._id)}
                  className="btn btn-error text-white join-item btn-sm"
                >
                  Remove
                </button>
              </div>
            </div>
            <span className="divider divider-neutral"></span>
            <pre>
              {message?.message && message?.message.slice(0, 100) + "..."}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactMessage;
