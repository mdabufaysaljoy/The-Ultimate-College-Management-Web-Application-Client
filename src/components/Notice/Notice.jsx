import SectionHeading from "../SectionHeading/SectionHeading";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useEffect, useState } from "react";
import NoticeCard from "../NoticeCard/NoticeCard";
import PrimaryButton from "../Buttons/PrimaryButton";

const Notice = () => {
  const axiosPublic = useAxiosPublic();
  const [allNotices, setAllNotices] = useState([]);

  useEffect(() => {
    const getAllNoticesFn = async () => {
      const getAllNotices = await axiosPublic.get("/notices");
      setAllNotices(getAllNotices.data.allNotices);
      // console.log(getAllNotices.data);
    };
    getAllNoticesFn();
  }, [axiosPublic]);
  return (
    <section id="notice" className="p-12 bg-[#EBEBEB] dark:bg-[#4c4c4c]">
      <div className="max-w-2xl mx-auto space-y-4 mb-8 text-center">
        <h2 className="text-4xl font-bold">Notices</h2>
        <p className="text-xl">
          Stay Updated: Explore the Latest Notices from UIU for Key Information
          on Academic Schedules, Upcoming Events, and Essential University
          Announcements. Keep Informed, Stay Ahead!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {allNotices.slice(0, 4).map((notice, idx) => (
          <NoticeCard key={idx} notice={notice} />
        ))}
      </div>
      <Link to="/all-notices">
        <PrimaryButton className="w-full">
          View All
          <ExternalLink></ExternalLink>
        </PrimaryButton>
      </Link>
    </section>
  );
};

export default Notice;
