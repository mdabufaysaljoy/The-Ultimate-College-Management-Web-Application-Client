import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
const ProgramsCard = ({ img, title, shortdesc, btntext }) => {
  return (
    <div className="text-start max-w-72">
      <div className="max-w-72 max-h-48 overflow-hidden mb-2 rounded-lg</div>">
        <img
          src={img}
          className="hover:scale-125 duration-3000"
          alt="Program"
        />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-lg">{shortdesc}</p>
      <PrimaryButton>{btntext} </PrimaryButton>
    </div>
  );
};

export default ProgramsCard;
