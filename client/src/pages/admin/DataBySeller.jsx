import React, { useEffect, useState } from "react";
import { useSalesContext } from "../../context/salesContext.jsx";
import { useParams } from "react-router-dom";
import { columns } from "../../helper/DataGridConfig.jsx";
import DataTable from "../../components/DataTable.jsx";
import CustomToolbar from "../../components/GridToolbar.jsx";

const DataBySeller = () => {
  const { seller } = useParams();
  const { getDataBySeller, putSale } = useSalesContext();
  const salesFiltered = getDataBySeller(seller);

  return (
    <div className="flex justify-center items-center mt-36">
      <div className="bg-white p-2 rounded-xl mb-8 w-[90vw]">
        <DataTable props={{ columns, salesFiltered, putSale, seller }} />
      </div>
    </div>
  );
};

export default DataBySeller;
