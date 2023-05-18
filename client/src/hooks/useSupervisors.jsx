import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext.jsx";
import { ROL } from "../helper/Roles.js";

const useSupervisors = () => {
  const { user, getSupervisors } = useUserContext();
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    if (user?.rol === ROL.ADMIN) {
      getSupervisors()
        .then((res) => setSupervisors(res))
        .catch((error) => error);
    }
  }, [user]);

  return { supervisors };
};

export default useSupervisors;
