import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Image1 from "../../assets/cover.jpg";
import Image2 from "../../assets/cover.jpg";
import Image3 from "../../assets/cover.jpg";
import PrimaryButton from "./../Buttons/PrimaryButton";

export default function SimpleSlider() {
  return (
    <Carousel
      axis="horizontal"
      autoPlay={true}
      interval={5000}
      showArrows={true}
      showThumbs={true}
      infiniteLoop={true}
      thumbWidth={100}
    >
      <div className="text-white font-bold  relative">
        <img className="w-full " src={Image1} alt="" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <p>Admission Open Summer 2026 Trimester</p>
          <h2 className="text-4xl">United International University</h2>
          <PrimaryButton>Apply Now</PrimaryButton>
        </div>
      </div>
      <div className="text-white font-bold  relative">
        <img className="w-full h-1/2" src={Image2} alt="" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <p>Admission Open Summer 2026 Trimester</p>
          <h2 className="text-4xl">United International University</h2>
          <PrimaryButton>Apply Now</PrimaryButton>
        </div>
      </div>
      <div className="text-white font-bold  relative">
        <img className="w-full " src={Image3} alt="" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <p>Admission Open Summer 2026 Trimester</p>
          <h2 className="text-4xl">United International University</h2>
          <PrimaryButton>Apply Now</PrimaryButton>
        </div>
      </div>
    </Carousel>
  );
}
