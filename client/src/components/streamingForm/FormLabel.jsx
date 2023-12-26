import React from "react";

const FormLabel = ({ children, ...props }) => {
  return (
    <label {...props} className="uppercase font-bold">
      {children}
    </label>
  );
};

export default FormLabel;
