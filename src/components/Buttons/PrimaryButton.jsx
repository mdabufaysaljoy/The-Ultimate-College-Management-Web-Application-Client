import React from "react";

const PrimaryButton = ({ children, className }) => {
  return (
    <button
      className={`btn bg-brand text-white mt-4 shadow-none border-none ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
