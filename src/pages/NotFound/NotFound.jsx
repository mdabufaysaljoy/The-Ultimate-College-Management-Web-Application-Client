import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import PageNotFound from "../../assets/LottieJSON/PageNotFound.json";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col justify-center items-center">
        <Link title="Click anywhere to go to homepage" to="/">
          <Lottie animationData={PageNotFound} className="h-full" />
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
