import React from "react";

const CardEchart = ({ component }) => {
  return (
    <section className=" p-2 gap-2 justify-center items-center bg-secondary-100 border-double shadow-slate-300  rounded-xl shadow-sm absolute w-[12%] h-min">
      {component}
    </section>
  );
};

export default CardEchart;
