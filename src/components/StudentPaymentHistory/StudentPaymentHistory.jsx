import { useQuery } from "@tanstack/react-query";
import copy from "copy-to-clipboard";
import { Copy } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";

const StudentPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: studentPayments = [] } = useQuery({
    queryKey: ["studentPaymentHistory", user],
    enabled: !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/student-payment/find-by-email/${user?.email}`
      );
      return response.data;
    },
  });
  // console.log(studentPayments);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Month</th>
            <th>Transection ID</th>
            <th>Amount</th>
            <th>Paid Via</th>
          </tr>
        </thead>
        <tbody>
          {studentPayments.map((val, idx) => (
            <tr key={idx}>
              <th>{idx + 1}</th>
              <th>{val.month}</th>
              <td>
                <button
                  onClick={() => copy(val.transectionId)}
                  className="btn btn-ghost btn-sm"
                  title="Click to copy"
                >
                  {val.transectionId}
                  <Copy />
                </button>
              </td>
              <td>{val.amountPaid}</td>
              <td>{val.paidWith}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPaymentHistory;
