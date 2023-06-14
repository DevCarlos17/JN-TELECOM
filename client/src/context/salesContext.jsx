import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import { useUserContext } from "./userContext.jsx";
import { API } from "../../Config.js";
import axios from "axios";
import { ROL } from "../helper/Roles.js";

const salesContext = createContext([]);

export const useSalesContext = () => useContext(salesContext);

export const SalesProvider = ({ children }) => {
  const { user } = useUserContext();
  const [sales, setSales] = useState([]);

  const [salesFiltered, setSalesFiltered] = useState([]);

  //Clear filter seller sales
  const clearFilterBySeller = () => {
    setSalesFiltered(sales);
  };

  //Handles Data from DATA BASE
  const getGlobalSales = async () => {
    try {
      const salesFeteched = await fetch(`${API}/ventas`);
      return await salesFeteched.json();
    } catch (error) {
      return new Error(error);
    }
  };

  const getSalesBySeller = async (username) => {
    try {
      const salesFeteched = await fetch(`${API}/sales/seller/${username}`);
      return await salesFeteched.json();
    } catch (error) {
      return new Error(error);
    }
  };

  const getSalesBySupervisor = async (username) => {
    try {
      const salesFeteched = await fetch(`${API}/sales/supervisor/${username}`);
      return await salesFeteched.json();
    } catch (error) {
      return new Error(error);
    }
  };

  const getSales = async () => {
    if (user?.rol === ROL.ADMIN) {
      getGlobalSales()
        .then((data) => {
          const reversedData = data.reverse();
          setSales(reversedData);
          setSalesFiltered(reversedData);
        })
        .catch((err) => err);
    }

    if (user?.rol === ROL.SUPERVISOR) {
      getSalesBySupervisor(user.username).then((data) => {
        const reversedData = data.reverse();
        setSales(reversedData);
        setSalesFiltered(reversedData);
      });
    }

    if (user?.rol === ROL.EMPLOYEE) {
      getSalesBySeller(user.username)
        .then((data) => {
          const reversedData = data.reverse();
          setSales(reversedData);
          setSalesFiltered(reversedData);
        })
        .catch((err) => err);
    }
  };

  const postSale = async (sale) => {
    const form = new FormData();

    for (let key in sale) {
      if (key === "images") {
        sale[key].forEach((file) => {
          form.append(key, file, file.name);
        });
      } else {
        form.append(key, sale[key]);
      }
    }

    try {
      const response = await axios.post(`${API}/ventas`, form, {
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await getSales();
      return response;
    } catch (error) {
      return error.response.data;
    }
  };

  const putSale = async (data) => {
    const { _id } = data;
    try {
      const response = await axios.put(`${API}/ventas/${_id}`, data, {
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await getSales();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSale = async (sale) => {
    const { _id } = sale;
    try {
      await axios.delete(`${API}/ventas/${_id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImages = async (data) => {
    const { _id, images } = data;

    const arrayImages = [...images];

    try {
      const response = axios.post(
        `${API}/ventas/uploadImages/${_id}`,
        arrayImages,
        {
          mode: "cors",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getSales();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImages = async (data) => {
    const { _id } = data;

    try {
      const response = axios.put(`${API}/ventas/deleteImage/${_id}`, data, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaleImages = async ({ selectedCustomer, url }) => {
    const updatedSale = selectedCustomer.images.filter((img) => img.url == url);

    const newSale = { ...selectedCustomer, images: updatedSale };
    return await deleteImages(newSale);
  };

  // Sales Filters
  const getDataBySeller = (seller) => {
    return sales.filter((sale) => sale.vendedor === seller);
  };

  const filterSaleBySupervisor = (supervisor) => {
    const data = sales.filter((sale) => sale.supervisor === supervisor);
    setSalesFiltered(data);
  };
  const filterSaleBySeller = (seller) => {
    const data = sales.filter((sale) => sale.vendedor === seller);
    setSalesFiltered(data);
  };

  const getSaleById = (id) => {
    return sales.filter((sale) => sale._id === id);
  };

  useEffect(() => {
    if (user) {
      getSales(user);
    }
  }, [user]);

  return (
    <salesContext.Provider
      value={{
        sales,
        filterSaleBySeller,
        salesFiltered,
        clearFilterBySeller,
        postSale,
        getGlobalSales,
        putSale,
        getDataBySeller,
        getSales,
        getSaleById,
        filterSaleBySupervisor,
        handleSaleImages,
        uploadImages,
      }}>
      {children}
    </salesContext.Provider>
  );
};
