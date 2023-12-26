import React, { createContext, useContext, useState } from "react";
import { API } from "../../Config.js";
import { performRequest, toaster } from "../helper/utils.js";
import { useEffect } from "react";
import { CURRENT_DAY, CURRENT_MONTH } from "../helper/date.js";

const streamingContext = createContext([]);

export const useStreamingContext = () => useContext(streamingContext);

const StreamingProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [showFilteredAccounts, setShowFilteredAccounts] = useState(false);

  const URL = `${API}/streaming`;

  const getProfiles = (accounts) => {
    const profiles = accounts.flatMap((account) => {
      const { plataforma, correo, contraseña, perfiles } = account;

      return perfiles.map((user) => ({
        ...user,
        plataforma,
        correo,
        contraseña,
      }));
    });

    return profiles;
  };

  const getExpiredProfiles = (profiles) => {
    const filteredProfiles = profiles.filter(({ vencimiento }) => {
      const expiredDate = new Date(vencimiento);
      const expiredMonth = expiredDate.getUTCMonth();
      const expiredDay = expiredDate.getUTCDate();

      if (expiredMonth === CURRENT_MONTH && expiredDay === CURRENT_DAY) {
        return true;
      }
    });

    return filteredProfiles;
  };

  const getAccounts = async () => {
    return await performRequest(`${URL}/accounts`, "GET");
  };

  const filterExpiredProfiles = async () => {
    const accounts = await getAccounts();
    const profiles = getProfiles(accounts);
    const expiredProfiles = getExpiredProfiles(profiles);
    setProfiles(expiredProfiles);
    console.log("FILTRADOS", expiredProfiles);
  };

  const resetProfiles = async () => {
    setProfiles(await getProfiles(accounts));
  };

  const handleGetAccounts = async ({ status }) => {
    if (!status) return;
    const data = await getAccounts();
    setAccounts(data.toReversed());
    setProfiles(getProfiles(data.toReversed()));
  };

  const createAccount = async (account) => {
    const response = await performRequest(`${URL}/accounts`, "POST", account);
    handleGetAccounts(response);
    return response;
  };

  const updateAccount = async (account) => {
    const { _id } = account;

    const response = await performRequest(
      `${URL}/accounts/${_id}`,
      "PUT",
      account
    );
    handleGetAccounts(response);
    return response;
  };

  const deleteAccount = async (account) => {
    const { _id } = account;
    const response = await performRequest(
      `${URL}/accounts/${_id}`,
      "DELETE",
      account
    );
    handleGetAccounts(response);
    return response;
  };

  useEffect(() => {
    getAccounts().then((res) => {
      setAccounts(res.toReversed());
      setProfiles(getProfiles(res.toReversed()));
    });
  }, []);

  return (
    <streamingContext.Provider
      value={{
        accounts,
        profiles,
        getAccounts,
        createAccount,
        updateAccount,
        deleteAccount,
        showFilteredAccounts,
        filterExpiredProfiles,
        resetProfiles,
      }}>
      {children}
    </streamingContext.Provider>
  );
};

export default StreamingProvider;
