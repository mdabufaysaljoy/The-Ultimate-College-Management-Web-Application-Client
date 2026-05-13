import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import ProgramsCard from "../ProgramsCard/ProgramsCard";
import img1 from "../../assets/ugp.jpg";
import img2 from "../../assets/pgp.jpg";
import img3 from "../../assets/cep.png";

const Admission = () => {
  return (
    <div className="bg-[#EBEBEB] dark:bg-[#4c4c4c] p-8">
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <h2 className="text-4xl font-bold"> Admission</h2>
        <p className="font-semibold text-lg ">
          United International University (UIU) offers a comprehensive admission
          process, welcoming students into diverse programs that foster academic
          growth and real-world skills, set in a supportive and innovative
          educational environment.
        </p>
      </div>
      <div className="flex flex-col items-center gap-8 mt-8">
        <div className=" flex gap-4">
          <ProgramsCard
            img={img1}
            title="Undergraduate Programs"
            shortdesc="UIU Offers 12 undergraduate programs from 4 different schools"
            btntext="Undergraduate Programs"
          />
          <ProgramsCard
            img={img2}
            title="Postgraduate Programs"
            shortdesc="UIU Offers 8 postgraduate programs from 4 different schools"
            btntext="Postgraduate Programs"
          />
          <ProgramsCard
            img={img3}
            title="Continuing Education"
            shortdesc="From different centers and institutes UIU offers over 40 short professional courses."
            btntext="Continuing Education"
          />
        </div>
        <PrimaryButton className={"btn-wide btn-lg"}>More About Admission</PrimaryButton>
      </div>
    </div>
  );
};

export default Admission;
