import Lottie from "lottie-react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import WarnJSON from "../../assets/LottieJSON/warning.json";
import InfoJSON from "../../assets/LottieJSON/info.json";
import IgnoreableJSON from "../../assets/LottieJSON/ignorable.json";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UniversalSelectLimit from "../../components/UniversalSelectLimit/UniversalSelectLimit";
import UniversalPaginate from "../../components/UniversalPaginate/UniversalPaginate";
import NoticeCard from "../../components/NoticeCard/NoticeCard";

const AllNotices = () => {
  const axiosPublic = useAxiosPublic();
  const [allNotices, setAllNotices] = useState([]);
  const [currentpage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [pageLimit, setPageLimit] = useState(8);
  const [importanceType, setImportanceType] = useState("");

  useEffect(() => {
    const getAllNoticesFn = async () => {
      const pageForBackend = currentpage + 1;
      const getAllNotices = await axiosPublic.get(
        `/notices?page=${pageForBackend}&limit=${pageLimit}&importanceType=${importanceType}`
      );
      setPageCount(getAllNotices.data.pageCount);
      setAllNotices(getAllNotices.data.allNotices);
      // console.log(getAllNotices.data.allNotices);
      // console.log(getAllNotices.data);
    };
    getAllNoticesFn();
  }, [axiosPublic, currentpage, pageLimit, importanceType]);
  // console.log(pageCount);
  const setLimit = (event) => {
    setPageLimit(parseInt(event.target.value));
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const handleSortChange = event => {
   setImportanceType(event.target.value);
  }
  return (
    <section id="allNotices" className="py-2 ">
      <SectionHeading>All Notices</SectionHeading>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row justify-between sm:items-center">
        <UniversalSelectLimit setLimit={setLimit} />
        <div className="text-lg">
          Sort: {" "}
          <select
            name="importanceType"
            id="importanceType"
            className="bg-white px-2 py-1 text-black rounded-md"
            defaultValue=""
            onChange={handleSortChange}
          >
            <option value="">All</option>
            <option value="most important">Most Important</option>
            <option value="informative">Informative</option>
            <option value="ignoreable">Ignorable</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allNotices.map((notice, idx) => (
         <NoticeCard notice={notice} key={idx}/>
        ))}
      </div>
      <UniversalPaginate 
        handlePageClick={handlePageClick}
        pageCount={pageCount}
      />
    </section>
  );
};

export default AllNotices;
