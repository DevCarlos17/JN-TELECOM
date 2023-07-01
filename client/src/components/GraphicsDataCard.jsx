import React from "react";

const CardDataGraph = ({ data }) => {
  const { data: sales } = data?.series[0];

  const totalSales = sales.reduce((acc, curr) => (acc += curr.value), 0);

  return (
    <div className="flex flex-col gap-2 p-2 mb-2 bg-secondary-100 border-double shadow-slate-300 rounded-xl shadow-sm w-[11vw]">
      <span className="font-bold text-white">{`TOTAL INGRESADAS: ${totalSales}`}</span>
    </div>
  );
};

export default CardDataGraph;
