import React from "react";

const PreventionNotice = ({ action, cancel }) => {
  return (
    <div className=" bg-secondary-100 p-6 rounded-xl shadow-2xl min-w-min">
      <span className=" uppercase">¿Estas seguro de realizar esta accion?</span>
      <hr className="my-4 border-gray-500/30" />
      <div className="flex justify-center gap-4">
        <button
          className="bg-primary text-black uppercase font-bold text-sm w-[3rem] py-2 px-2 rounded-lg hover:bg-primary/80 transition-colors"
          onClick={action}>
          SI
        </button>
        <button
          className="bg-primary text-black uppercase font-bold text-sm w-[3rem] py-2 px-2 rounded-lg hover:bg-primary/80 transition-colors"
          onClick={cancel}>
          NO
        </button>
      </div>
    </div>
  );
};

export default PreventionNotice;
