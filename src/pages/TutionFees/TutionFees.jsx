import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../hooks/useAxiosSecure/useAxiosSecure";
import { Loader } from "lucide-react";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// const studentPayments = {
//   January: "paid",
//   February: "paid",
//   March: "paid",
//   April: "paid",
//   May: "paid",
//   June: "paid",
//   July: "paid",
//   August: "due",
//   September: "due",
//   // baki gula default upcoming dhore nibo
// };
const currentMonthIndex = new Date().getMonth();

const TutionFees = () => {
  const [studentPayments, setStudentPayment] = useState({});

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: feeSettings = {}, isLoading } = useQuery({
    queryKey: ["month"],
    queryFn: async () => {
      const response = await axiosSecure.get("/fee-setting");
      return response.data;
    },
  });

  const { monthlyFee, examFeeMonths, otherFeeMonths } = feeSettings;
  const handlePayment = async (total, month) => {
    const Doc = {
      amountPaid: total,
      email: user.email,
      month,
      phone: "01601119598",
    };
    try {
      const response = await axiosSecure.post("/student-payment/init", Doc);
      if (response.data?.success) {
        window.location.href = response.data.url;
      } else {
        Swal.fire({
          title: response.data?.message,
          icon: "error",
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function getStudentPaymentByEmail() {
      const response = await axiosSecure.get(
        `/student-payment/find-by-email/${user?.email}`
      );
      if (response.status === 200) {
        const manipulate = response.data.reduce((acc, cur) => {
          const { month, paymentStatus } = cur;
          acc[month] = paymentStatus;
          // console.log(acc, cur, month, paymentStatus);
          return acc;
        }, {});
        setStudentPayment(manipulate);
      }
    }
    if (user?.email) {
      getStudentPaymentByEmail();
    }
  }, [axiosSecure, user?.email]);

  if (isLoading) {
    return <Loader />;
  }
  // console.log(studentPayments["August"]);
  return (
    <div className="py-8">
      <h1 className="text-4xl text-center pb-12 font-bold border-b">
        Payment - {new Date().getFullYear()}
      </h1>
      <div className="overflow-x-auto overflow-y-scroll h-[500px]">
        <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th>Count</th>
              <th>Month</th>
              <th>Tution Fee</th>
              <th>Exam Fee</th>
              <th>Others Fee</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {months.map((month, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{month}</td>
                <td>{monthlyFee || 0}</td>
                <td>{examFeeMonths?.[month] || 0}</td>
                <td>
                  {otherFeeMonths.find((item) => item.month === month)?.fee ||
                    0}{" "}
                  <span className="text-xs">
                    {otherFeeMonths.find((item) => item.month === month)
                      ?.note || ""}
                  </span>
                </td>
                <td>
                  {(monthlyFee || 0) +
                    (examFeeMonths[month] || 0) +
                    (otherFeeMonths.find((item) => item.month === month)?.fee ||
                      0)}
                </td>
                <td>
                  <button
                    className={`btn btn-sm  ${
                      currentMonthIndex < idx &&
                      studentPayments?.[month] !== "paid"
                        ? ""
                        : currentMonthIndex > idx &&
                          studentPayments?.[month] === "paid"
                        ? ""
                        : currentMonthIndex === idx &&
                          studentPayments?.[month] !== "paid"
                        ? "bg-green-500"
                        : "btn-warning"
                    }`}
                    disabled={
                      currentMonthIndex < idx ||
                      studentPayments[month] === "paid"
                    }
                    onClick={() =>
                      handlePayment(
                        (monthlyFee || 0) +
                          (examFeeMonths[month] || 0) +
                          (otherFeeMonths.find((item) => item.month === month)
                            ?.fee || 0),
                        month
                      )
                    }
                  >
                    {currentMonthIndex < idx &&
                    studentPayments?.[month] !== "paid"
                      ? "Upcoming"
                      : currentMonthIndex > idx &&
                        studentPayments?.[month] === "paid"
                      ? "Paid"
                      : currentMonthIndex === idx &&
                        studentPayments?.[month] !== "paid"
                      ? "Pay Now"
                      : currentMonthIndex === idx &&
                        studentPayments?.[month] === "paid"
                      ? "Paid"
                      : "Due"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutionFees;
