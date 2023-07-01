import React from "react";

const GraphicsDataCard = ({ data }) => {
  const { data: sales } = data?.series[0];

  const totalSales = sales.reduce((acc, curr) => (acc += curr?.value), 0);
  const totalPaid = sales.filter((sale) => sale.name === "PAGADA")[0]?.value;

  return (
    <div className="flex flex-col gap-2 p-2 mb-2 bg-secondary-100 border-double shadow-slate-300 rounded-xl shadow-sm  w-[9vw]">
      <span className="font-bold text-white">{`INSTALADAS: ${
        totalPaid ? totalPaid : 0
      }`}</span>
      <hr className="border-gray-500/30" />
      <span className="font-bold text-white">{`INGRESADAS: ${
        totalSales ? totalSales : 0
      }`}</span>{" "}
    </div>
  );
};

export default GraphicsDataCard;
