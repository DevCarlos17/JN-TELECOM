import React from "react";

const FormInput = ({ children, ...props }) => {
  return (
    <input
      className="py-3 pl-4 pr-4 bg-secondary-900/70 w-full outline-none rounded-lg focus:border border-primary"
      style={{ color: "" }} // Agrega esta línea para personalizar el color del icono del calendario
      {...props}>
      {children}
    </input>
  );
};

export default FormInput;
