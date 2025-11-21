import { Link, useLocation } from "react-router-dom";
import copy from "copy-to-clipboard";
import { Copy } from "lucide-react";
import SuccessJSON from "../../assets/LottieJSON/Success.json";
import Lottie from "lottie-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const transectionId = queryParams.get("transectionId");
  const { data: paymentInfo = {} } = useQuery({
    queryKey: ["transection", transectionId],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/student-payment/find-by-transectionId/${transectionId}`
      );
      if (response.status === 200) {
        return response.data;
      }
    },
  });
  // console.log(Object.keys(paymentInfo));
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-center">Payment Success</h1>
      <div className="w-full flex justify-center my-4">
        <Lottie animationData={SuccessJSON} className="w-32" />
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100/40 mt-5 w-1/2 mx-auto">
        <table className="table">
          <tbody>
            {/* row 1 */}
            <tr>
              <th>Transection ID</th>
              <td>
                <button
                  onClick={() => copy(transectionId)}
                  className="btn btn-ghost"
                  title="Click to copy"
                >
                  {transectionId}
                  <Copy />
                </button>
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{paymentInfo.email}</td>
            </tr>
            <tr>
              <th>Payment Month</th>
              <td>{paymentInfo.month}</td>
            </tr>
            <tr>
              <th>Payment Amount</th>
              <td>BDT {paymentInfo.amountPaid}</td>
            </tr>
            <tr>
              <th>Payment Method</th>
              <td>{paymentInfo.paidWith}</td>
            </tr>
            <tr>
              <th>Payment Status</th>
              <td>{paymentInfo.paymentStatus}</td>
            </tr>
            <tr>
              <th>Payment Date</th>
              <td>{paymentInfo.paymentDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link className="btn btn-secondary w-45 mx-auto mt-10 flex" to='/'>Go to Home Page</Link>
    </div>
  );
};

export default PaymentSuccess;
