import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Image3 from "../../assets/cover.png";

export default function SimpleSlider() {
  return (
    <Carousel axis="vertical" autoPlay={true} interval={3000} showArrows={true} showThumbs={true} infiniteLoop={true} thumbWidth={100}>
      <div className="text-black">
        <img className="w-full" src={Image3} alt="" />
      </div>
      <div className="text-black">
        <img className="w-full" src={Image3} alt="" />
      </div>
      <div className="text-black">
        <img className="w-full" src={Image3} alt="" />
      </div>
    </Carousel>
  );
}
