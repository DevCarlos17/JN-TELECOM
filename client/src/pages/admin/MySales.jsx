import React, { useEffect, useState } from "react";
import { useSalesContext } from "../../context/salesContext.jsx";
import DataTable from "../../components/DataTable.jsx";
import { columns } from "../../helper/DataGridConfig.jsx";
import BtnEnterSale from "../../components/BtnEnterSale.jsx";
import CustomToolbar from "../../components/GridToolbar.jsx";

const MySales = () => {
  const { salesFiltered } = useSalesContext();

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-[90vw]">
        <DataTable
          props={{
            salesFiltered,
            columns,
            BtnEnterSale,
            CustomToolbar,
          }}
        />
      </div>
    </div>
  );
};

export default MySales;
