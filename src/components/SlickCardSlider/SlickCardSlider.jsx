import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/s1.jpg";
import img2 from "../../assets/s2.jpg";
import img3 from "../../assets/s3.jpg";
import img4 from "../../assets/s4.png";
import img5 from "../../assets/s5.png";
import img6 from "../../assets/s6.png";
import img7 from "../../assets/s7.png";
import { ArrowBigRightIcon } from "lucide-react";

function SlickCardSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    speed: 7000,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };
  return (
    <div className="slider-container mx-12 text-white dark:text-[#00374c]">
      <Slider {...settings}>
        <div className="p-4 bg-white rounded-2xl shadow border-[10px] border-[#F1FBFF] dark:border-[#00374c] s">
          <img src={img1} alt="" />
          <h3 className="text-2xl font-bold text-center mt-2">
            <a className="hover:underline" href="#">QS ASIA</a>
          </h3>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow border-[10px] border-[#F1FBFF] dark:border-[#00374c]">
          <img src={img2} alt="" />
          <h3 className="text-2xl font-bold text-center mt-2">
            <a className="hover:underline" href="#">QS WORLD</a>
            </h3>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow border-[10px] border-[#F1FBFF] dark:border-[#00374c]">
          <img src={img3} alt="" />
          <h3 className="text-2xl font-bold text-center mt-2">
            <a className="hover:underline" href="#">IIA</a>
          </h3>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow border-[10px] border-[#F1FBFF] dark:border-[#00374c]">
          <img src={img4} alt="" />
          <h3 className="text-2xl font-bold text-center mt-2">
            <a className="hover:underline" href="#">ACCA</a>
          </h3>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow border-[10px] border-[#F1FBFF] dark:border-[#00374c]">
          <img src={img5} alt="" />
          <h3 className="text-2xl font-bold text-center mt-2">
            <a className="hover:underline" href="#">IEB</a>
          </h3>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow border-[10px] border-[#F1FBFF] dark:border-[#00374c]">
          <img src={img6} alt="" />
          <h3 className="text-2xl font-bold text-center mt-2">
            <a className="hover:underline" href="#">THE IMPACT</a>
          </h3>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow border-[10px] border-[#F1FBFF] dark:border-[#00374c]">
          <img src={img7} alt="" />
          <h3 className="text-2xl font-bold text-center mt-2">
            <a className="hover:underline" href="#">ACBSP</a>
          </h3>
        </div>
      </Slider>
    </div>
  );
}

export default SlickCardSlider;
