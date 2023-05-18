import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext.jsx";
import { ROL } from "../helper/Roles.js";

const useEmployees = () => {
  const { user, getEmployees } = useUserContext();
  const [employees, setEmployees] = useState([]);

  const filterEmployeesBySupervisor = (supervisor) => {
    return employees.filter((employee) => employee.supervisor === supervisor);
  };

  useEffect(() => {
    if (user?.rol === ROL.ADMIN || user?.rol === ROL.SUPERVISOR) {
      getEmployees()
        .then((res) => setEmployees(res))
        .catch((error) => error);
    }
  }, [user]);

  return { employees, filterEmployeesBySupervisor };
};

export default useEmployees;
