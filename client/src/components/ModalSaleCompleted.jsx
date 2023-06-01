import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext.jsx";

const ModalSaleCompleted = ({ setStatusFormSale, handleModalFormSale }) => {
  const navigate = useNavigate();
  const sendCompleted = () => {
    setStatusFormSale(false);
    handleModalFormSale();
    navigate("/GlobalSales");
  };

  return (
    <div className=" bg-secondary-100 p-6 rounded-xl shadow-2xl min-w-min">
      <span className=" uppercase">Venta registrada con exito!</span>
      <hr className="my-4 border-gray-500/30" />
      <div className="flex justify-center">
        <button
          onClick={() => sendCompleted()}
          className="bg-primary text-black uppercase font-bold text-sm min-w-min py-2 px-2 rounded-lg hover:bg-primary/80 transition-colors">
          aceptar
        </button>
      </div>
    </div>
  );
};

export default ModalSaleCompleted;
