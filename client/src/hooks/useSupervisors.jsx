import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext.jsx";

const useSupervisors = () => {
  const { user, getSupervisors } = useUserContext();
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    if (user?.isAdmin) {
      getSupervisors()
        .then((res) => setSupervisors(res))
        .catch((error) => error);
    }
  }, [user]);

  return { supervisors };
};

export default useSupervisors;
