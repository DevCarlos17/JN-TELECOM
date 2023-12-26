import React from "react";

const FormInput = ({ children, ...props }) => {
  return (
    <input
      className="py-3 pl-4 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
      {...props}>
      {children}
    </input>
  );
};

export default FormInput;
