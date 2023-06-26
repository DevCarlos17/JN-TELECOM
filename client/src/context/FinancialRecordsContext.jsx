import React, { useContext, createContext, useState, useEffect } from "react";
import { performRequest } from "../helper/ultils.js";
import { API } from "../../Config.js";

const FinancialRecordsContext = createContext([]);

export const useFinancialRecordContext = () =>
  useContext(FinancialRecordsContext);

const FinancialRecordsProvider = ({ children }) => {
  const [financialRecords, setFinancialRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const URL = `${API}/financial-records`;

  const getFinancialRecords = async () => {
    return await performRequest(URL, "GET");
  };

  const handleRecords = async ({ status }) => {
    if (!status) return;
    const reversedData = await getFinancialRecords();
    setFinancialRecords(reversedData.reverse());
  };

  const postFinancialRecord = async (record) => {
    try {
      const response = await performRequest(URL, "POST", record);
      handleRecords(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFinancialRecord = async (record) => {
    const response = await performRequest(URL, "PUT", record);
    handleRecords(response);
  };

  const deleteFinancialRecord = async (record) => {
    const response = await performRequest(URL, "DELETE", record);
    handleRecords(response);
  };

  useEffect(() => {
    getFinancialRecords().then((records) => {
      setFinancialRecords(records.reverse());
      setFilteredRecords(records.reverse());
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
        filteredRecords,
      }}>
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export default FinancialRecordsProvider;
