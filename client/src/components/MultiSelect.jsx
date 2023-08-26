import React from "react";
import { MultiSelect } from "primereact/multiselect";
import useMultiSelect from "../hooks/useMultiSelect.jsx";

const MultiSelectUser = ({ value, onChange, options }) => {
  return (
    <div className="card flex justify-content-center">
      <MultiSelect
        value={value}
        onChange={onChange}
        options={options}
        optionLabel="username"
        filter
        placeholder="Seleccionar Usuarios"
        maxSelectedLabels={10}
        className="w-full md:w-20rem text-black"
      />
    </div>
  );
};

export default MultiSelectUser;
