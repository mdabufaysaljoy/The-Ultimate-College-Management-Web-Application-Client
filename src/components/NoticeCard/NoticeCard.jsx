import Lottie from "lottie-react";
import WarnJSON from "../../assets/LottieJSON/warning.json";
import InfoJSON from "../../assets/LottieJSON/info.json";
import { Link } from "react-router-dom";
import IgnoreableJSON from "../../assets/LottieJSON/ignorable.json";
import PrimaryButton from "../Buttons/PrimaryButton";
const NoticeCard = ({ notice }) => {
  return (
    <div className="bg-[#2F4858] text-white  p-2 space-y-4">
      <article className="flex  justify-between items-center">
        <aside className="w-1/12 bg-[#485680] rounded-full ml-8">
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
        <div className="space-y-2 shirnk-0 w-11/12 px-8 py-4">
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
      <Link to={`/view-notice/${notice._id}`} state={notice}>
        <PrimaryButton className="w-full"> Click to View Full</PrimaryButton>
      </Link>
        </div>
      </article>
    </div>
  );
};

export default NoticeCard;
