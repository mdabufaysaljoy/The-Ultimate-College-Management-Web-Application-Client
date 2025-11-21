
import SectionHeading from '../SectionHeading/SectionHeading';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic/useAxiosPublic';
import { useEffect, useState } from 'react';
import NoticeCard from '../NoticeCard/NoticeCard';

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
      <section id="notice" className="py-12 ">
        <SectionHeading>Notice</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allNotices.slice(0,4).map((notice, idx) => (
          <NoticeCard key={idx} notice={notice} />
          ))}
        </div>
        <Link to="/all-notices" className="btn btn-primary w-full mt-8 text-lg">
          View All
          <ExternalLink></ExternalLink>
        </Link>
      </section>
    );
};

export default Notice;