import React from "react";
import SlickCardSlider from "../SlickCardSlider/SlickCardSlider";
const Recognition = () => {
  return (
    <div className="bg-[#F1FBFF] dark:bg-[#00374c] py-16">
      <div className="max-w-2xl mx-auto space-y-4 mb-8 text-center">
        <h2 className="text-4xl font-bold">Recognition</h2>
        <p className="text-xl">
          United International University (UIU) is acclaimed for its educational
          quality, boasting notable rankings and recognitions in higher
          education, reflecting its commitment to academic and research
          excellence on both a national and global scale.
        </p>
      </div>
      <SlickCardSlider></SlickCardSlider>
    </div>
  );
};

export default Recognition;
