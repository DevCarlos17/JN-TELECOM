import React from "react";
import { json, useParams } from "react-router-dom";
import { useSalesContext } from "../../context/salesContext.jsx";

const SaleEdit = () => {
  const { id } = useParams();
  const { getSaleById } = useSalesContext();

  const sale = getSaleById(id)[0];
  if (sale) {
    console.log(sale);
  }

  return (
    <div className="h-[85vh] flex flex-col justify-center items-center">
      {sale && <p>{`ID: ${id} - ${sale.nombre} ${sale.apellido}`}</p>}
    </div>
  );
};

export default SaleEdit;
