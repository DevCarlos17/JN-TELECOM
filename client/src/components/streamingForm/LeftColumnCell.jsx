import React from "react";

const LeftColumnCell = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="font-bold uppercase">{title}</h1>
      <span>{subtitle}</span>
    </div>
  );
};

export default LeftColumnCell;
