import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../Config.js";

const contactContext = createContext([]);

export const useContactContext = () => useContext(contactContext);

const reverseData = (data) => data.reverse();

const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const response = await axios.get(`${API}/contacts`);
      setContacts(response.data);
      return reverseData(response.data);
    } catch (error) {}
  };

  function handleContact({ data }) {
    if (!data.status) return;
    return getContacts();
  }

  const createContact = async (contact) => {
    try {
      const response = await axios.post(`${API}/contacts`, contact);
      handleContact(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact) => {
    const { _id } = contact;
    try {
      const response = await axios.put(`${API}/contacts/${_id}`, contact);
      handleContact(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteContact = async (contact) => {
    const { _id } = contact;
    try {
      const response = await axios.delete(`${API}/contacts/${_id}`, contact);
      handleContact(response);
      return response.data;
    } catch (error) {}
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <contactContext.Provider
      value={{
        contacts,
        getContacts,
        createContact,
        updateContact,
        deleteContact,
      }}>
      {children}
    </contactContext.Provider>
  );
};

export default ContactProvider;
