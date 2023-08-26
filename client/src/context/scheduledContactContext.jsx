import React, { useState, createContext, useContext, useEffect } from "react";
import { performRequest } from "../helper/ultils.js";
import { API } from "../../Config.js";

const ScheduledContactContext = createContext([]);

export const useScheduledContactContext = () =>
  useContext(ScheduledContactContext);

const ScheduledContactProvider = ({ children }) => {
  const [scheduledContacts, setScheduledContacts] = useState([]);

  const URL = `${API}/scheduledContact`;

  const getScheduledContacts = async () => {
    return await performRequest(URL, "GET");
  };

  const handleGetSecheduledContacts = async ({ status }) => {
    if (!status) return;
    const data = await getScheduledContacts();
    setScheduledContacts(data.reverse());
  };

  const createScheduledContact = async (data) => {
    const response = await performRequest(URL, "POST", data);
    handleGetSecheduledContacts(response);
    return response;
  };

  const updateScheduledContact = async (data) => {
    const { _id } = data;
    const response = await performRequest(`${URL}/${_id}`, "PUT", data);
    handleGetSecheduledContacts(response);
    return response;
  };

  const deleteScheduledContact = async (data) => {
    const { _id } = data;
    const response = await performRequest(`${URL}/${_id}`, "DELETE", data);
    handleGetSecheduledContacts(response);
    return response;
  };

  useEffect(() => {
    getScheduledContacts().then((data) => {
      setScheduledContacts(data.reverse());
    });
  }, []);

  return (
    <ScheduledContactContext.Provider
      value={{
        scheduledContacts,
        getScheduledContacts,
        createScheduledContact,
        updateScheduledContact,
        deleteScheduledContact,
      }}>
      {children}
    </ScheduledContactContext.Provider>
  );
};

export default ScheduledContactProvider;
