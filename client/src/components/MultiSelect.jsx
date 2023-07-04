import React from "react";
import { MultiSelect } from "primereact/multiselect";
import useMultiSelect from "../hooks/useMultiSelect.jsx";

const MultiSelectUser = () => {
  const { users, selectedUsers, handleSelect } = useMultiSelect();

  return (
    <div className="card flex justify-content-center">
      <MultiSelect
        value={selectedUsers}
        onChange={handleSelect}
        options={users}
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
