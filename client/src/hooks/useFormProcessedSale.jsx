import React, { useState } from "react";

const useFormProcessedSale = () => {
  const [formProcessedSale, setFormProcessedSale] = useState({
    predio: "",
    nombrePredio: "",
    presidente: "",
    administrador: "",
    direccion: "",
    distrito: "",
    supervisor: "",
    estado: "",
  });

  const handleFormProcessedSale = (e) => {
    const { name, value } = e.target;
    setFormProcessedSale({ ...formProcessedSale, [name]: value });
  };

  return { formProcessedSale, handleFormProcessedSale };
};

export default useFormProcessedSale;