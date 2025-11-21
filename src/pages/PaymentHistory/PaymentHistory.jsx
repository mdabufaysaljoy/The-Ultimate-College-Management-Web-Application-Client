import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import DoughnutChart from "../../components/DoughnutChart/DoughnutChart";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  // const { data: allStudents = [] } = useQuery({
  //   queryKey: ["allStudents"],
  //   queryFn: async () => {
  //     const response = await axiosSecure.get("/users/allStudents");
  //     return response.data;
  //   },
  // });
  // console.log(allUsers);
  const { data: allPayments = [], isLoading } = useQuery({
    queryKey: ["studentPayment"],
    queryFn: async () => {
      const response = await axiosSecure.get("/student-payment");
      // console.log(response.data);
      return response.data || [];
    },
  });
  // const collectAllStudentCount = allStudents.reduce((acc, val) => {
  //   if (val.role === "student") {
  //     acc += 1;
  //   }
  //   return acc;
  // }, 0);
  const collectingDatas = allPayments.reduce(
    (acc, val) => {
      const index = acc.labels.indexOf(val.month);

      if (index === -1) {
        acc.labels.push(val.month);
        acc.value.push(1);
      } else {
        acc.value[index] += 1;
      }

      return acc;
    },
    { labels: [], value: [] }
  );
  // const paidEmails = new Set(allPayments.map((p) => p.email));

  // const studentNotPaid = allStudents.reduce((acc, student) => {
  //   if (!paidEmails.has(student.email)) acc += 1;
  //   return acc;
  // }, 0);
  // const doughnutData = {
  //   labels: ["students paid", "students not paid"],
  //   value: [allStudents?.length - studentNotPaid, studentNotPaid],
  // };

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading-spinner"></span>
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">
        Payment history table
      </h2>
      <div className="h-[380px] overflow-auto">
        <table className="table">
          {/* head */}
          <thead className="sticky top-0 bg-accent text-black">
            <tr>
              <th>Email</th>
              <th>Month</th>
              <th>Paid via</th>
              <th>Amount paid</th>
              <th>Payment date</th>
            </tr>
          </thead>
          <tbody>
            {allPayments.map((payment, idx) => (
              <tr key={idx} className="hover:bg-base-300">
                <th>{payment?.email}</th>
                <td>{payment?.month}</td>
                <td>{payment?.paidWith}</td>
                <td>{payment?.amountPaid}</td>
                <td>{payment?.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-2xl font-bold text-center mb-12 mt-12">
        Payment history graph
      </h2>
      <div className="flex justify-between">
        <div className="w-[400px]">
          <h3 className="text-xl font-bold mb-4">Payment month Graph</h3>
          <DoughnutChart doughnutData={collectingDatas}></DoughnutChart>
        </div>
        {/* <div className="w-[400px]">
          <h3 className="text-xl font-bold mb-4">Payment Students Graph</h3>
          <DoughnutChart doughnutData={doughnutData}></DoughnutChart>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentHistory;
