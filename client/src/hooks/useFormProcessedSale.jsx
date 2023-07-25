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
    resultado: "",
    estado: "",
  });

  const handleFormProcessedSale = (e) => {
    const { name, value } = e.target;
    setFormProcessedSale({ ...formProcessedSale, [name]: value });
  };

  return { formProcessedSale, handleFormProcessedSale, setFormProcessedSale };
};

export default useFormProcessedSale;
