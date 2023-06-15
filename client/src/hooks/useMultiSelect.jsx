import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import { useUserContext } from "../context/userContext.jsx";

const useMultiSelect = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { getEmployees, changeCanSeeContact } = useUserContext();

  const handleSelect = async (e) => {
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

  return { users, selectedUsers, handleSelect };
};

export default useMultiSelect;
