import React, { useState, createContext, useContext, useEffect } from "react";
import { performRequest } from "../helper/ultils.js";
import { API } from "../../Config.js";

const VerticalGrowthContext = createContext([]);

export const useVerticalGrowthContext = () => useContext(VerticalGrowthContext);

const VerticalGrowthProvider = ({ children }) => {
  const [processedSales, setProcessedSales] = useState([]);
  const [filteredProcessedSales, setFilteredProcessedSales] = useState([]);

  const URL = `${API}/vertical-growth`;

  const getProcessedSales = async () => {
    return await performRequest(URL, "GET");
  };

  const handleGetProcessedSales = async ({ status }) => {
    if (!status) return;
    const data = await getProcessedSales();
    setProcessedSales(data.reverse());
    setFilteredProcessedSales(data.reverse());
  };

  const postProcessedSale = async (data) => {
    const response = await performRequest(URL, "POST", data);
    handleGetProcessedSales(response);
    return response;
  };

  const putProcessedSale = async (data) => {
    const response = await performRequest(URL, "PUT", data);
    handleGetProcessedSales(response);
    return response;
  };

  const deleteProcessedSale = async (data) => {
    const response = await performRequest(URL, "DELETE", data);
    console.log(response);
    handleGetProcessedSales(response);
  };

  useEffect(() => {
    getProcessedSales().then((data) => {
      setProcessedSales(data.reverse());
      setFilteredProcessedSales(data.reverse());
    });
  }, []);

  return (
    <VerticalGrowthContext.Provider
      value={{
        processedSales,
        getProcessedSales,
        postProcessedSale,
        putProcessedSale,
        deleteProcessedSale,
      }}>
      {children}
    </VerticalGrowthContext.Provider>
  );
};

export default VerticalGrowthProvider;
