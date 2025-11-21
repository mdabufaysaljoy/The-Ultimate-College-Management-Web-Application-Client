import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
const Footer = () => {
  return (
    <div className="bg-brand-blue/50">
      <div className="max-w-7xl mx-auto py-8 px-2 grid grid-cols-12 gap-4">
        <div className="flex flex-col items-center md:flex-row gap-4 bg-gray-100 dark:bg-gray-700 rounded-xl p-4 col-span-12 md:col-span-5">
          <img src={Logo} alt="" className="w-40" />
          <div className="flex flex-col gap-1 ">
            <h3 className="text-2xl font-bold">Notre Dame College</h3>
            <p className="text-sm indent-5 text-gray-600 dark:text-gray-400">
              - Quality education is our main object.
            </p>
            <address>
              232/2, West Bramhondi, <br /> Narsingdi Sadar, Narsingdi, <br />{" "}
              Dhaka, Bangladesh.
            </address>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 col-span-12 md:col-span-3">
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="ms-5 mt-2 space-y-2">
            <li className="flex items-center">
              <ArrowRight size={20} />{" "}
              <Link to="/" className="link link-hover">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <ArrowRight size={20} />{" "}
              <Link to="/about" className="link link-hover">
                About
              </Link>
            </li>
            <li className="flex items-center">
              <ArrowRight size={20} />{" "}
              <Link to="/all-notices" className="link link-hover">
                All Notices
              </Link>
            </li>
            <li className="flex items-center">
              <ArrowRight size={20} />{" "}
              <Link to="/departments" className="link link-hover">
                Departments
              </Link>
            </li>
            <li className="flex items-center">
              <ArrowRight size={20} />{" "}
              <Link to="/contacts" className="link link-hover">
                Contacts
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl col-span-12 md:col-span-4">
          <h3 className="text-2xl font-bold p-4">Social Links</h3>
          <div className="flex gap-4 mx-4 pb-4">
            <Link className="bg-white p-2 rounded-full text-blue-500 hover:scale-105 hover:shadow duration-200">
              <Facebook />
            </Link>
            <Link className="bg-white p-2 rounded-full text-red-500 hover:scale-105 hover:shadow duration-200">
              <Instagram />
            </Link>
            <Link className="bg-white p-2 rounded-full text-blue-600 hover:scale-105 hover:shadow duration-200">
              <Twitter />
            </Link>
            <Link className="bg-white p-2 rounded-full text-red-500 hover:scale-105 hover:shadow duration-200">
              <Youtube />
            </Link>
          </div>
        </div>
      </div>
      <div className="divider m-0"></div>
      <p className="text-sm text-center pb-4">
        &copy; All Rights Reserved ||{" "}
        <a href="https://facebook.com/faysaljoy" target="_blank">
          Faysal Joy
        </a>
      </p>
    </div>
  );
};

export default Footer;
