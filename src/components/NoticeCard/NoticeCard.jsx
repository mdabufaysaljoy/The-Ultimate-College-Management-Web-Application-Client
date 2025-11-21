import Lottie from "lottie-react";
import WarnJSON from "../../assets/LottieJSON/warning.json";
import InfoJSON from "../../assets/LottieJSON/info.json";
import { Link } from 'react-router-dom';
import IgnoreableJSON from "../../assets/LottieJSON/ignorable.json";
const NoticeCard = ({ notice }) => {
  return (
    <div className="bg-yellow-100  text-black rounded-2xl p-2 space-y-4">
      <article className="flex flex-col justify-between items-center">
        <aside className="w-1/2">
          <Lottie
            animationData={
              notice.importanceType === "most important"
                ? WarnJSON
                : notice.importanceType === "informative"
                ? InfoJSON
                : IgnoreableJSON
            }
            className={
              notice.importanceType === "informative" ? "rotate-180" : ""
            }
          />
        </aside>
        <div className="space-y-2 ">
          <h3 className="text-xl font-bold">{notice.title}</h3>
          <p className="font-semibold">
            Importance Type:{" "}
            <span
              className={
                notice.importanceType === "most important"
                  ? "badge text-white badge-error"
                  : notice.importanceType === "informative"
                  ? "badge text-white badge-info"
                  : "badge text-white badge-primary"
              }
            >
              {notice.importanceType}
            </span>
          </p>
          <p className="code">
            <span className="font-semibold">Publish Date: </span>
            {notice.publishDate}
          </p>
          <p className="text-sm">{notice.description.slice(0, 160) + "..."}</p>
        </div>
      </article>
      <Link
        to={`/view-notice/${notice._id}`}
        className="btn btn-primary w-full"
        state={notice}
      >
        Click to View Full
      </Link>
    </div>
  );
};

export default NoticeCard;
