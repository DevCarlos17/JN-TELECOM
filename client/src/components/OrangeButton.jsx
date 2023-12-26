import React from "react";

const OrangeButton = ({ children, size, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors ${size}`}>
      {children}
    </button>
  );
};

export default OrangeButton;
