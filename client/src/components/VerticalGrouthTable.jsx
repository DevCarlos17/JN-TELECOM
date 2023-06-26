import React, { useEffect, useState } from "react";
import { useSalesContext } from "../context/salesContext.jsx";
import DataTableSales from "./DataTable2.jsx";
import { useVerticalGrowthContext } from "../context/verticalGrowthContext.jsx";

const VerticalGrouthTable = () => {
  const { processedSales } = useVerticalGrowthContext();

  return <DataTableSales verticalGrowth={true} paidSales={processedSales} />;
};

export default VerticalGrouthTable;
