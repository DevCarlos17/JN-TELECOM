import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import useSelectOptions from "../hooks/useSelectOptions.jsx";

const SelectOptions = ({ options, selectedOption, handleOption }) => {
  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedOption}
        onChange={handleOption}
        options={options}
        optionLabel="name"
        placeholder="Filtrar por"
        className="w-full md:w-14rem"
      />
    </div>
  );
};

export default SelectOptions;
