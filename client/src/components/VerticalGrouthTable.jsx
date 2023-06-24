import React, { useEffect, useState } from "react";
import { useSalesContext } from "../context/salesContext.jsx";
import DataTableSales from "./DataTable2.jsx";

const VerticalGrouthTable = () => {
  const [paidSales, setPaidSales] = useState([]);
  const { getPaidSales } = useSalesContext();

  useEffect(() => {
    setPaidSales(getPaidSales());
  }, [getPaidSales]);

  return <DataTableSales verticalGrouth={true} paidSales={paidSales} />;
};

export default VerticalGrouthTable;
