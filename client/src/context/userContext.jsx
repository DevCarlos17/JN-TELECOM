import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const userContext = createContext();

export const useUserContext = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [employees, setIsEmplooyes] = useState([]);
  const [loading, setLoading] = useState(false);

  const signin = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/signin", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      return await response.json();
    } catch (error) {
      return error;
    }
  };

  const onLogout = () => {
    Cookies.remove("token");
    setToken(null);
    setUser(null);
  };

  const getUser = async (token) => {
    if (!token) return;
    try {
      const userFeteched = await fetch("http://localhost:4000/user", {
        headers: {
          "auth-token": token,
        },
      });
      return await userFeteched.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployees = async () => {
    const response = await fetch("http://localhost:4000/getEmployees");
    const employees = await response.json();
    return employees;
  };

  const getSupervisors = async () => {
    const response = await fetch("http://localhost:4000/getSupervisors");
    const supervisor = await response.json();
    return supervisor;
  };

  const createUser = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async () => {};
  const deleteUser = async () => {};

  useEffect(() => {
    setLoading(true);
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
    const handleUser = async () => {
      setUser(await getUser(token));
      setLoading(false);
    };
    handleUser();
  }, [token]);

  return (
    <userContext.Provider
      value={{
        signin,
        createUser,
        updateUser,
        deleteUser,
        getEmployees,
        getSupervisors,
        onLogout,
        token,
        setToken,
        setLoading,
        user,
        loading,
      }}>
      {children}
    </userContext.Provider>
  );
};
