import React, { useContext, createContext, useState, useEffect } from "react";
import { performRequest } from "../helper/ultils.js";
import { API } from "../../Config.js";

const FinancialRecordsContext = createContext([]);

export const useFinancialRecordContext = () =>
  useContext(FinancialRecordsContext);

const FinancialRecordsProvider = ({ children }) => {
  const [financialRecords, setFinancialRecords] = useState([]);

  const URL = `${API}/financial-records`;

  const getFinancialRecords = async () => {
    return await performRequest(URL, "GET");
  };

  const handleGetRecords = async ({ status }) => {
    if (!status) return;
    const dataRecords = await getFinancialRecords();
    setFinancialRecords(dataRecords);
  };

  const postFinancialRecord = async (record) => {
    try {
      const response = await performRequest(URL, "POST", record);
      handleGetRecords(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFinancialRecord = async (record) => {
    const response = await performRequest(URL, "PUT", record);
    handleGetRecords(response);
  };

  const deleteFinancialRecord = async (record) => {
    const response = await performRequest(URL, "DELETE", record);
    handleGetRecords(response);
  };

  useEffect(() => {
    getFinancialRecords().then((records) => {
      setFinancialRecords(records);
    });
  }, []);

  return (
    <FinancialRecordsContext.Provider
      value={{
        getFinancialRecords,
        postFinancialRecord,
        updateFinancialRecord,
        deleteFinancialRecord,
        financialRecords,
      }}>
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export default FinancialRecordsProvider;
