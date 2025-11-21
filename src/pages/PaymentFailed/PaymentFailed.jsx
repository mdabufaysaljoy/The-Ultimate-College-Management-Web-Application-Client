import Lottie from "lottie-react";
import ErrorJSON from '../../assets/LottieJSON/error.json'
import { Link, useLocation } from "react-router-dom";
const PaymentFailed = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const reason = query.get('reason');
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-red-500 text-center">
        Payment Failed!
      </h1>
      <div className="flex flex-col items-center w-full justify-center pt-10">
        <Lottie animationData={ErrorJSON} className="w-52" />
        <p className="font-semibold mt-4 text-center text-white">{reason}</p>
      </div>
      <Link className="btn btn-secondary w-45 mx-auto mt-10 flex" to="/">
        Go to Home Page
      </Link>
    </div>
  );
};

export default PaymentFailed;
