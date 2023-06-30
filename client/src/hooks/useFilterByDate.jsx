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

  // Filter by week
  const filterByWeek = (data, selectedDate) => {
    const startOfWeekDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(selectedDate, { weekStartsOn: 1 });

    return data.filter((record) => {
      const itemDate = new Date(record.createdAt);
      return isWithinInterval(itemDate, {
        start: startOfWeekDate,
        end: endOfWeekDate,
      });
    });
  };

  // Filter by month
  const filterByMonth = (data, selectedDate) => {
    const startOfMonthDate = startOfMonth(selectedDate);
    const endOfMonthDate = endOfMonth(selectedDate);

    return data.filter((record) => {
      const itemDate = new Date(record.createdAt);
      return isWithinInterval(itemDate, {
        start: startOfMonthDate,
        end: endOfMonthDate,
      });
    });
  };

  // Filter by year
  const filterByYear = (data, selectedDate) => {
    const startOfYearDate = startOfYear(selectedDate);
    const endOfYearDate = endOfYear(selectedDate);

    return data.filter((record) => {
      const itemDate = new Date(record.createdAt);
      return isWithinInterval(itemDate, {
        start: startOfYearDate,
        end: endOfYearDate,
      });
    });
  };

  const handleFilterByWeek = (filteredRecords, selectedDate) => {
    const filteredByWeekData = filterByWeek(filteredRecords, selectedDate);
    setFilteredData(filteredByWeekData.reverse());
  };

  const handleFilterByMonth = (filteredRecords, selectedDate) => {
    const filteredByMonthData = filterByMonth(filteredRecords, selectedDate);
    setFilteredData(filteredByMonthData.reverse());
  };

  const handleFilterByYear = (filteredRecords, selectedDate) => {
    const filteredByYearData = filterByYear(filteredRecords, selectedDate);
    setFilteredData(filteredByYearData.reverse());
  };

  const filterByOption = (data, option, selectedDate) => {
    switch (option?.code) {
      case "week":
        handleFilterByWeek(data, selectedDate);
        break;

      case "month":
        handleFilterByMonth(data, selectedDate);

        break;

      case "year":
        handleFilterByYear(data, selectedDate);

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
