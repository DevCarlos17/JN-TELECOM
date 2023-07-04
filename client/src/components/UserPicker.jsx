import React from "react";
import { Dropdown } from "primereact/dropdown";

const UserPicker = ({ users, selectedUser, handleSelectedUser, button }) => {
  return (
    <div className=" flex flex-col gap-2 p-2 mb-2 bg-secondary-100 border-double shadow-slate-300 rounded-xl shadow-sm w-full">
      <Dropdown
        value={selectedUser}
        onChange={handleSelectedUser}
        options={users}
        optionLabel="name"
        placeholder="Filtrar por empleado"
        className="w-full md:w-14rem"
      />
      {button && button}
    </div>
  );
};

export default UserPicker;
