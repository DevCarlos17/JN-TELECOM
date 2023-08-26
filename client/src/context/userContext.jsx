import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API } from "../../Config.js";
import axios from "axios";

const userContext = createContext();

export const useUserContext = () => useContext(userContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signin = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/signin`, {
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

  const getUserByToke = async (token) => {
    if (!token) return;
    try {
      const userFeteched = await fetch(`${API}/user`, {
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
    const response = await fetch(`${API}/getEmployees`);
    const employees = await response.json();
    return employees;
  };

  const getSupervisors = async () => {
    const response = await fetch(`${API}/getSupervisors`);
    const supervisor = await response.json();
    return supervisor;
  };

  const createUser = async (data) => {
    console.log("createUser", data);
    try {
      const response = await fetch(`${API}/signup`, {
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

  const changeCanSeeContact = async (user) => {
    const { _id } = user;
    const response = await axios.put(`${API}/user/canSeeContact/${_id}`, user);
    return response.data;
  };

  const changeCanSeeScheduledContact = async (user) => {
    const { _id } = user;
    console.log("user", user);
    const response = await axios.put(
      `${API}/user/canSeeScheduledContact/${_id}`,
      user
    );
    console.log("res", response);

    return response.data;
  };

  useEffect(() => {
    setLoading(true);
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
    const handleUser = async () => {
      setUser(await getUserByToke(token));
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
        changeCanSeeContact,
        changeCanSeeScheduledContact,
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
