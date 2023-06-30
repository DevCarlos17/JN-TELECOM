import React, { useEffect, useState } from "react";
import EchartsComponent from "../../components/EchartsComponent.jsx";
import { useSalesContext } from "../../context/salesContext.jsx";
import DataPicker from "../../components/DataPicker.jsx";
import SelectOptions from "../../components/SelectOptions.jsx";
import { Button } from "primereact/button";
import useSelectOptions from "../../hooks/useSelectOptions.jsx";
import useDataPicker from "../../hooks/useDataPicker.jsx";
import useFilterByDate from "../../hooks/useFilterByDate.jsx";

const Balance = () => {
  const optionsEcharts = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        color: "#FFFFFF",
        opacity: 1,
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: `Ventas`,
        type: "pie",
        radius: "60%",
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  const filterOptions = [
    { name: "Semana", code: "week" },
    { name: "Mes", code: "month" },
    { name: "Año", code: "year" },
  ];
  const [detailsData, setDetailsData] = useState(optionsEcharts);
  const { sales } = useSalesContext();
  const { selectedDate, handleDateChange } = useDataPicker();
  const { selectedOption, handleOption } = useSelectOptions();
  const { filteredData, filterByOption } = useFilterByDate();

  const getDetalles = (data) => {
    const salesCount = data.reduce((acc, curr) => {
      const { result } = curr;

      if (!acc[result]) {
        acc[result] = 1;
      } else {
        acc[result] += 1;
      }

      return acc;
    }, {});

    const salesArray = Object.entries(salesCount).map(([name, value]) => ({
      name,
      value,
    }));

    return salesArray;
  };

  const getColorByName = (name) => {
    switch (name) {
      case "VENTA":
        return "#FFFFFF";

      case "INGRESADA":
        return "#6B7280";

      case "PAGADA":
        return "#84CC16";

      case "INSTALADA":
        return "#3B82F6";

      case "RECHAZADA":
        return "#EF4444";

      case "ZONA SATURADA":
        return "#FCD34D";

      case "ARBITRAJE":
        return "#EC4899";

      case "NO GRABO":
        return "#8B5CF6";

      case "PROGRAMADA":
        return "#22D3EE";

      case "SIN FOTO":
        return "#000000";

      default:
        return "";
    }
  };

  useEffect(() => {
    const newData = getDetalles(filteredData);

    const updatedData = newData.map((item) => ({
      ...item,
      itemStyle: {
        color: getColorByName(item.name), // Asigna el color correspondiente según el nombre del elemento
      },
      label: { color: "#FFFFFF" },
    }));

    setDetailsData((prevOptions) => ({
      ...prevOptions,
      series: [
        {
          ...prevOptions.series[0],
          data: updatedData,
        },
      ],
    }));
  }, [sales, filteredData]);

  return (
    <div className=" w-max md:w-full relative">
      <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
        Balance J&<span className="text-primary">N TELECOM</span>
      </h1>
      <div className="flex gap-2 mb-2">
        <DataPicker
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
        <SelectOptions
          options={filterOptions}
          handleOption={handleOption}
          selectedOption={selectedOption}
        />
        <Button
          type="button"
          label="Buscar"
          severity="warning"
          everity="info"
          onClick={() => filterByOption(sales, selectedOption, selectedDate)}
          style={{ color: "black" }}
        />
      </div>
      <EchartsComponent options={detailsData} />
    </div>
  );
};

export default Balance;
