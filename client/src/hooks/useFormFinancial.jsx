import React, { useState } from "react";

const useFormFinancial = () => {
  const [formFinancial, setformFinancial] = useState({
    ingreso: null,
    gasto: null,
    motivo: "",
    total: null,
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    const newValue = name === "motivo" ? value : parseInt(value);

    setformFinancial({
      ...formFinancial,
      [name]: newValue,
      total: formFinancial.ingreso - formFinancial.gasto,
    });
  };

  return { formFinancial, handleInput, setformFinancial };
};

export default useFormFinancial;
