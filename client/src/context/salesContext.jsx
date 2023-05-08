import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import { useUserContext } from "./userContext.jsx";
import { API } from "../../Config.js";

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

  const getSales = (user) => {
    if (!user.isAdmin) {
      getSalesBySeller(user.username)
        .then((data) => {
          setSales(data);
          setSalesFiltered(data);
        })
        .catch((err) => err);
    } else {
      getGlobalSales()
        .then((data) => {
          setSales(data);
          setSalesFiltered(data);
        })
        .catch((err) => err);
    }
  };
  const updateData = async (user) => {
    getSales(user);
  };

  const postSale = async (form) => {
    try {
      const response = await fetch(`${API}/ventas`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      await updateData(user);
      return data;
    } catch (error) {
      console.log(error);
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
