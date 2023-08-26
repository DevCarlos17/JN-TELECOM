import { useEffect, useState } from "react";

const useMultiSelect = ({ permission, onChange, getEmployees }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelect = async (e) => {
    try {
      const res = await onChange(e.selectedOption);
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
        (user) => user[permission] === true
      );

      setUsers(employees);
      setSelectedUsers(userWithPermission);
    };

    fetchData();
  }, []);

  return { users, selectedUsers, handleSelect };
};

export default useMultiSelect;
