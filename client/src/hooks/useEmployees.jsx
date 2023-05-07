import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext.jsx";

const useEmployees = () => {
  const { user, getEmployees } = useUserContext();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (user?.isAdmin) {
      getEmployees()
        .then((res) => setEmployees(res))
        .catch((error) => error);
    }
  }, [user]);

  return { employees };
};

export default useEmployees;
