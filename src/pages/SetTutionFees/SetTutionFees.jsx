import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const SetTutionFees = () => {
  const [monthlyFee, setMonthlyFee] = useState(0);
  const [otherFee, setOtherFee] = useState([{ month: "", fee: "", note: "" }]);
  const axiosSecure = useAxiosSecure();
  const [examFees, setExamFees] = useState([{ month: "", fee: "" }]);
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
  const handleExamFeeChange = (index, field, value) => {
    const updated = [...examFees];
    updated[index][field] = value;
    setExamFees(updated);
  };
  const handleOtherFeeChange = (index, field, value) => {
    const updated = [...otherFee];
    updated[index][field] = value;
    setOtherFee(updated);
  };
  const handleRemoveExamFeeRow = (index) => {
    const update = [...examFees];
    update.splice(index, 1);
    setExamFees(update);
  };
  const handleRemoveOtherRow = (index) => {
    const update = [...otherFee];
    update.splice(index, 1);
    setOtherFee(update);
  };
  const handleAddExamFeeRow = () => {
    setExamFees([...examFees, { month: "", fee: "" }]);
  };
  const handleAddOtherFeeRow = () => {
    setOtherFee([...otherFee, { month: "", fee: "", note: "" }]);
  };
  //   console.log(examFees);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const examFeeObject = {};
    examFees.forEach((item) => {
      if (item.month && item.fee) {
        examFeeObject[item.month] = Number(item.fee);
      }
    });

    const finalData = {
      monthlyFee: Number(monthlyFee),
      examFeeMonths: examFeeObject,
      otherFeeMonths: otherFee,
    };
    try {
      const response = await axiosSecure.post("/fee-setting", finalData);
      // console.log(response.data);
      if (response.data.success) {
        Swal.fire({
          title: response.data.message,
          icon: "success",
          timer: 1500,
        });
        setMonthlyFee("");
        setExamFees([{ month: "", fee: "" }]);
        setOtherFee([{ month: "", fee: "", note: "" }]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-center">Set Tution Fee</h1>
      <div className="w-full md:w-2/3 mx-auto bg-brand-blue mt-8 px-2 py-8 rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-fit flex flex-col items-start gap-4"
        >
          {/* monthly fee  */}
          <div className="flex items-center gap-2 text-sm md:text-base">
            <label>Monthly Fee:</label>
            <input
              type="number"
              className="md:py-1 px-1 md:px-2 outline-none border-none bg-white rounded-md text-black"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(e.target.value)}
              required
            />
          </div>
          {/* exam fee dynamic */}
          <div className="space-y-2 text-sm md:text-base">
            <label className="md:font-semibold block mb-2">
              Exam Fee & Months:
            </label>
            {examFees.map((item, idx) => (
              <div className="flex gap-1 md:gap-2" key={idx}>
                {/* month select */}
                <select
                  value={item.month}
                  onChange={(e) =>
                    handleExamFeeChange(idx, "month", e.target.value)
                  }
                  className="text-black bg-white rounded md:p-1"
                >
                  <option value="">Select Month</option>
                  {months.map((month, idx) => (
                    <option key={idx} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                {/* exam fee input  */}
                <input
                  type="number"
                  value={item.fee}
                  onChange={(e) =>
                    handleExamFeeChange(idx, "fee", e.target.value)
                  }
                  className="md:px-2 md:py-1 px-1 w-28 md:w-full rounded text-black bg-white"
                  required
                />

                {examFees.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-sm md:btn-md btn-outline btn-error text-white"
                    onClick={() => handleRemoveExamFeeRow(idx)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            {/* add button  */}
            <button
              type="button"
              onClick={handleAddExamFeeRow}
              className="btn btn-accent text-white btn-sm mt-2"
            >
              + Add Month
            </button>
          </div>
          {/* other fee dynamic  */}
          <div className="space-y-2 text-sm md:text-base">
            <label className="md:font-semibold block mb-2">
              Other Fee & Months:
            </label>
            {otherFee.map((item, index) => (
              <div className="md:space-x-2 space-x-1 space-y-2" key={index}>
                {/* month select */}
                <select
                  value={item.month}
                  onChange={(e) =>
                    handleOtherFeeChange(index, "month", e.target.value)
                  }
                  className="text-black bg-white rounded md:p-1 w-20 md:w-fit"
                >
                  <option value="">Select Month</option>
                  {months.map((month, idx) => (
                    <option key={idx} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                {/* other fee input  */}
                <input
                  type="number"
                  value={item.fee}
                  onChange={(e) =>
                    handleOtherFeeChange(index, "fee", Number(e.target.value))
                  }
                  className="md:px-2 md:py-1 px-1 w-20 md:w-fit rounded text-black bg-white"
                  required
                />
                {/* fee note */}
                <input
                  type="text"
                  value={item.note}
                  onChange={(e) =>
                    handleOtherFeeChange(index, "note", e.target.value)
                  }
                  className="md:px-2 md:py-1 px-1 w-20 md:w-fit rounded text-black bg-white"
                  placeholder="write other fee note here"
                  required
                />
                {otherFee.length > 1 && (
                  <button
                    type="button"
                    className="btn px-3 md:btn-md btn-outline btn-error text-white"
                    onClick={() => handleRemoveOtherRow(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            {/* add button  */}
            <button
              type="button"
              onClick={handleAddOtherFeeRow}
              className="btn btn-accent text-white btn-sm mt-2"
            >
              + Add Month
            </button>
          </div>

          <button
            className="btn btn-success btn-wide text-white self-center mt-6"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetTutionFees;
