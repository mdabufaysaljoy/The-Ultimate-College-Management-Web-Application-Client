import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer";

const Root = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="bg-brand-blue/30 ">
        <div className="max-w-[1440px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Root