import React from "react";
import { useState } from "react";

const useModalFormSale = () => {
  const [isOpenModalFormSale, setIsOpenModalFormSale] = useState(false);
  const [message, setMessage] = useState("");

  const handleModalFormSale = () => {
    setIsOpenModalFormSale(!isOpenModalFormSale);
  };

  return {
    message,
    handleModalFormSale,
    isOpenModalFormSale,
    setMessage,
  };
};

export default useModalFormSale;
