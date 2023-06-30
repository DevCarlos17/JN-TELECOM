import React, { useEffect, useState } from "react";

const CardEchartData = ({ salesData }) => {
  const [info, setInfo] = useState(null);

  const { data } = salesData.series[0];

  const getData = (sales) => {
    return sales.reduce(
      (acc, curr) => {
        const { name, value } = curr;

        if (name === "PAGADA") {
          acc.totalPaid = value;
        }
        acc.totalSales += value;

        return acc;
      },
      { totalPaid: 0, totalSales: 0 }
    );
  };
  const getPercentage = (state) =>
    Math.floor((state?.totalPaid / state?.totalSales) * 100);

  useEffect(() => {
    setInfo(getData(data));
  }, [salesData]);

  return info ? (
    <section className="flex flex-col  gap-2 justify-center items-center bg-slate-300 text-black rounded-2xl hover:border-primary transition-colors absolute w-[10%] h-[50%]">
      <div className="flex flex-col absolute gap-2">
        <div className="bg-slate-500 rounded p-2">
          Ingresadas: {info.totalSales}
        </div>
        <div className="bg-slate-500 rounded p-2">
          Pagadas: {info.totalPaid}
        </div>
        <div className="bg-slate-500 rounded p-2">
          Porcentaje: {getPercentage(info)}
        </div>
      </div>
    </section>
  ) : (
    <div>Loading....</div>
  );
};

export default CardEchartData;
