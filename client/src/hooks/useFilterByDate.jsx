import React, { useState } from "react";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isWithinInterval,
} from "date-fns";

const useFilterByDate = () => {
  const [filteredData, setFilteredData] = useState([]);

  const fitlerByName = (data, user) => {
    return data.filter((sale) => sale.vendedor === user.name);
  };

  // Filter by week
  const filterByWeek = ({ data, selectedDate, selectedUser }) => {
    const startOfWeekDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(selectedDate, { weekStartsOn: 1 });

    const dataByWeek = data.filter((record) => {
      const itemDate = new Date(record.createdAt);
      return isWithinInterval(itemDate, {
        start: startOfWeekDate,
        end: endOfWeekDate,
      });
    });

    const filteredData = selectedUser
      ? fitlerByName(dataByWeek, selectedUser)
      : dataByWeek;

    return filteredData;
  };

  // Filter by month
  const filterByMonth = ({ data, selectedDate, selectedUser }) => {
    const startOfMonthDate = startOfMonth(selectedDate);
    const endOfMonthDate = endOfMonth(selectedDate);

    const dataByMonth = data.filter((record) => {
      const itemDate = new Date(record.createdAt);
      return isWithinInterval(itemDate, {
        start: startOfMonthDate,
        end: endOfMonthDate,
      });
    });

    const filteredData = selectedUser
      ? fitlerByName(dataByMonth, selectedUser)
      : dataByMonth;

    return filteredData;
  };

  // Filter by year
  const filterByYear = ({ data, selectedDate, selectedUser }) => {
    const startOfYearDate = startOfYear(selectedDate);
    const endOfYearDate = endOfYear(selectedDate);

    const dataByYear = data.filter((record) => {
      const itemDate = new Date(record.createdAt);
      return isWithinInterval(itemDate, {
        start: startOfYearDate,
        end: endOfYearDate,
      });
    });

    const filteredData = selectedUser
      ? fitlerByName(dataByYear, selectedUser)
      : dataByYear;

    return filteredData;
  };

  const handleFilterByWeek = ({ data, selectedDate, selectedUser }) => {
    const filteredByWeekData = filterByWeek({
      data,
      selectedDate,
      selectedUser,
    });
    setFilteredData(filteredByWeekData.reverse());
  };

  const handleFilterByMonth = ({ data, selectedDate, selectedUser }) => {
    const filteredByMonthData = filterByMonth({
      data,
      selectedDate,
      selectedUser,
    });
    setFilteredData(filteredByMonthData.reverse());
  };

  const handleFilterByYear = ({ data, selectedDate, selectedUser }) => {
    const filteredByYearData = filterByYear({
      data,
      selectedDate,
      selectedUser,
    });
    setFilteredData(filteredByYearData.reverse());
  };

  const filterByOption = ({
    data,
    selectedOption,
    selectedDate,
    selectedUser,
  }) => {
    switch (selectedOption?.code) {
      case "week":
        handleFilterByWeek({ data, selectedDate, selectedUser });
        break;

      case "month":
        handleFilterByMonth({ data, selectedDate, selectedUser });

        break;

      case "year":
        handleFilterByYear({ data, selectedDate, selectedUser });

        break;

      default:
        break;
    }
  };

  return {
    filteredData,
    filterByOption,
    handleFilterByMonth,
    handleFilterByWeek,
    handleFilterByYear,
  };
};

export default useFilterByDate;
