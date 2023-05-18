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
  const [search, setSearch] = useState("");
  const [estadoBusqueda, setEstadoBusqueda] = useState("");

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

  const getSales = (user) => {
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

  const updateData = async (user) => {
    getSales(user);
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
      await updateData(user);
      return response;
    } catch (error) {
      return error.response.data;
    }
  };

  const putSale = async (data) => {
    const { _id } = data;
    try {
      await fetch(`${API}/ventas/admin/${_id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSale = async () => {
    try {
      await fetch(`${API}/ventas/`, {
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleStateSearch = (e) => {
    setEstadoBusqueda(e.target.value);
  };

  const filterSales = () => {
    const filteredSale = sales.filter(
      (sale) => sale[estadoBusqueda].toLowerCase() === search.toLowerCase()
    );
    setSalesFiltered(filteredSale);
  };

  const clearFilter = () => {
    setSalesFiltered(sales);
    setSearch("");
  };

  // Handles Data from Context
  const getDataBySeller = (seller) => {
    return sales.filter((sale) => sale.vendedor === seller);
  };

  const filterSaleByData = (input, value) => {
    const data = sales.filter((sale) => sale[input] === value);
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
        salesFiltered,
        search,
        updateData,
        postSale,
        getGlobalSales,
        putSale,
        getDataBySeller,
        getSales,
        getSaleById,
        filterSaleByData,
        handleSearch,
        handleStateSearch,
        filterSales,
        clearFilter,
      }}>
      {children}
    </salesContext.Provider>
  );
};
