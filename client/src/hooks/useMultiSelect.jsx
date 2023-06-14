import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import { useUserContext } from "../context/userContext.jsx";

const useMultiSelect = () => {
  const [options, setOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [defaultOptions, setdefaultOptions] = useState([]);
  const animatedComponents = makeAnimated();

  const { getEmployees, changeCanSeeContact } = useUserContext();

  //Setter Options
  const handleOptions = (employees) => {
    const employeesArray = employees.map((employee) => ({
      value: employee._id,
      label: employee.username,
    }));
    setOptions(employeesArray);
  };

  const handleCanSeeContact = async (users) => {
    const cambiados = await Promise.all(
      users.map((user) => changeCanSeeContact(user))
    );
  };

  const handleSelectChange = async (users) => {
    console.log(users);
    //await handleCanSeeContact(users);
    setSelectedOptions(users);
  };

  const getUsersWithPermission = async () => {
    const employees = await getEmployees();
    const userWithPermision = employees
      .filter((user) => user.canSeeContact === true)
      .map((user) => ({
        value: user._id,
        label: user.username,
      }));
    setdefaultOptions(userWithPermision);
    return userWithPermision;
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      background: "#f2f2f2",
      color: "#F5A524",
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? "#F5A524" : "white",
      color: state.isFocused ? "white" : "black",
      cursor: "pointer",
    }),
  };

  useEffect(() => {
    const fetchData = async () => {
      const employees = await getEmployees();
      handleOptions(employees);
      const userWithPermission = await getUsersWithPermission();
      setSelectedOptions(userWithPermission);
    };

    fetchData();
  }, [getEmployees]);

  return {
    options,
    handleSelectChange,
    customStyles,
    animatedComponents,
    selectedOptions,
  };
};

export default useMultiSelect;
