import React, { useEffect, useState } from "react";
import { useSalesContext } from "../../context/salesContext.jsx";
import { useParams } from "react-router-dom";
import { columns } from "../../helper/DataGridConfig.jsx";
import DataTable from "../../components/DataTable.jsx";
import DataTableSales from "../../components/DataTable2.jsx";

const DataBySeller = () => {
  const { seller } = useParams();
  const { getDataBySeller, putSale } = useSalesContext();
  const salesBySeller = getDataBySeller(seller);

  return (
    <div className="flex justify-center items-center mt-1">
      <div className="bg-white  rounded-xl mb-8 w-[90vw]">
        <DataTableSales props={{ salesBySeller, seller }} />
      </div>
    </div>
  );
};

export default DataBySeller;
