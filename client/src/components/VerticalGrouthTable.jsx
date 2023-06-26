import React, { useEffect, useState } from "react";
import { useSalesContext } from "../context/salesContext.jsx";
import DataTableSales from "./DataTable2.jsx";
import { useVerticalGrowthContext } from "../context/verticalGrowthContext.jsx";

const VerticalGrouthTable = () => {
  const [paidSales, setPaidSales] = useState([]);
  const { processedSales, getProcessedSales } = useVerticalGrowthContext();

  useEffect(() => {
    setPaidSales(getProcessedSales());
  }, [getProcessedSales]);

  return <DataTableSales verticalGrowth={true} paidSales={processedSales} />;
};

export default VerticalGrouthTable;
