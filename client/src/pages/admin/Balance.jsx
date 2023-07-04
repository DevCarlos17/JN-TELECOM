import React, { useEffect, useState } from "react";
import EchartsComponent from "../../components/EchartsComponent.jsx";
import { useSalesContext } from "../../context/salesContext.jsx";
import DataPicker from "../../components/DataPicker.jsx";
import SelectOptions from "../../components/SelectOptions.jsx";
import { Button } from "primereact/button";
import useSelectOptions from "../../hooks/useSelectOptions.jsx";
import useDataPicker from "../../hooks/useDataPicker.jsx";
import useFilterByDate from "../../hooks/useFilterByDate.jsx";
import GraphSidebarWidget from "../../components/GraphSidebarWidget.jsx";
import GraphicsDataCard from "../../components/GraphicsDataCard.jsx";
import UserPicker from "../../components/UserPicker.jsx";
import useEmployees from "../../hooks/useEmployees.jsx";
import useUserPicker from "../../hooks/useUserPicker.jsx";
import { useUserContext } from "../../context/userContext.jsx";

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
        label: {
          show: true,
          formatter(param) {
            return `${param.name} (${param.percent * 1}%)`;
          },
        },
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
  const [users, setUsers] = useState(null);
  const [detailsData, setDetailsData] = useState(optionsEcharts);
  const { getEmployees } = useUserContext();
  const { sales } = useSalesContext();
  const { employees } = useEmployees();
  const { selectedDate, handleDateChange } = useDataPicker();
  const { selectedUser, handleSelectedUser, clearUserPicker } = useUserPicker();
  const { selectedOption, handleOption } = useSelectOptions();
  const { filteredData, filterByOption } = useFilterByDate();

  const formatterUser = (data) => {
    return data?.map((user) => ({
      name: user.username,
      code: user._id,
    }));
  };

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

  const dateFilter = (
    <div className=" flex flex-col gap-2 p-2 mb-2 bg-secondary-100 border-double shadow-slate-300 rounded-xl shadow-sm">
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
        onClick={() =>
          filterByOption({
            data: sales,
            selectedOption,
            selectedDate,
            selectedUser,
          })
        }
        style={{ color: "black" }}
      />
    </div>
  );

  const clearButton = (
    <Button
      type="button"
      label="Limpiar"
      severity="warning"
      everity="info"
      onClick={clearUserPicker}
      style={{ color: "black" }}
    />
  );

  useEffect(() => {
    getEmployees().then((data) => {
      setUsers(formatterUser(data));
    });

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
    <div className="w-max md:w-full">
      <div className="flex flex-col relative w-full">
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
          Balance J&<span className="text-primary">N TELECOM</span>
        </h1>
        <EchartsComponent options={detailsData} />
        <div className="absolute right-0 mt-16 w-[15vw]">
          <GraphSidebarWidget
            userPicker={
              <UserPicker
                users={users}
                selectedUser={selectedUser}
                handleSelectedUser={handleSelectedUser}
                button={clearButton}
              />
            }
            dateFilter={dateFilter}
            dataCard={<GraphicsDataCard data={detailsData} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Balance;
