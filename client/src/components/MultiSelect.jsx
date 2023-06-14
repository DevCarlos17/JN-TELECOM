import React, { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { useUserContext } from "../context/userContext.jsx";

const MultiSelectUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { getEmployees, changeCanSeeContact } = useUserContext();

  const onChange = async (e) => {
    try {
      const res = await changeCanSeeContact(e.selectedOption);
      if (res.status) {
        return setSelectedUsers(e.value);
      } else {
        setSelectedUsers(selectedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const employees = await getEmployees();
      const userWithPermission = employees.filter(
        (user) => user.canSeeContact === true
      );
      setUsers(employees);
      setSelectedUsers(userWithPermission);
    };

    fetchData();
  }, []);

  return (
    <div className="card flex justify-content-center">
      <MultiSelect
        value={selectedUsers}
        onChange={onChange}
        options={users}
        optionLabel="username"
        filter
        placeholder="Seleccionar Usuarios"
        maxSelectedLabels={10}
        className="w-full md:w-20rem"
      />
    </div>
  );
};

export default MultiSelectUser;
