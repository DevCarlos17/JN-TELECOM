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

  const filterByName = (data, user) => {
    return data.filter((sale) => sale.vendedor === user.name);
  };

  const filterByOperator = (data, selectedOperator) => {
    return data.filter((record) => record.operador === selectedOperator.name);
  };

  // Filter by week
  const filterByWeek = ({
    data,
    selectedDate,
    selectedUser,
    selectedOperator,
  }) => {
    const startOfWeekDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(selectedDate, { weekStartsOn: 1 });

    const dataByWeek = data.filter((record) => {
      const itemDate = new Date(record.createdAt);
      return isWithinInterval(itemDate, {
        start: startOfWeekDate,
        end: endOfWeekDate,
      });
    });

    let filteredData = dataByWeek;

    if (selectedUser) {
      filteredData = filterByName(filteredData, selectedUser);
    }

    if (selectedOperator) {
      filteredData = filterByOperator(filteredData, selectedOperator);
    }

    return filteredData;
  };

  // Filter by month
  const filterByMonth = ({
    data,
    selectedDate,
    selectedUser,
    selectedOperator,
  }) => {
    const startOfMonthDate = startOfMonth(selectedDate);
    const endOfMonthDate = endOfMonth(selectedDate);

    const dataByMonth = data.filter((record) => {
      const itemDate = new Date(record.createdAt);
      return isWithinInterval(itemDate, {
        start: startOfMonthDate,
        end: endOfMonthDate,
      });
    });

    let filteredData = dataByMonth;

    if (selectedUser) {
      filteredData = filterByName(filteredData, selectedUser);
    }

    if (selectedOperator) {
      filteredData = filterByOperator(filteredData, selectedOperator);
    }

    return filteredData;
  };

  // Filter by year
  const filterByYear = ({
    data,
    selectedDate,
    selectedUser,
    selectedOperator,
  }) => {
    const startOfYearDate = startOfYear(selectedDate);
    const endOfYearDate = endOfYear(selectedDate);

    const dataByYear = data.filter((record) => {
      const itemDate = new Date(record.createdAt);
      return isWithinInterval(itemDate, {
        start: startOfYearDate,
        end: endOfYearDate,
      });
    });

    let filteredData = dataByYear;

    if (selectedUser) {
      filteredData = filterByName(filteredData, selectedUser);
    }

    if (selectedOperator) {
      filteredData = filterByOperator(filteredData, selectedOperator);
    }

    return filteredData;
  };

  const handleFilterByWeek = ({
    data,
    selectedDate,
    selectedUser,
    selectedOperator,
  }) => {
    const filteredByWeekData = filterByWeek({
      data,
      selectedDate,
      selectedUser,
      selectedOperator,
    });
    setFilteredData(filteredByWeekData.reverse());
  };

  const handleFilterByMonth = ({
    data,
    selectedDate,
    selectedUser,
    selectedOperator,
  }) => {
    const filteredByMonthData = filterByMonth({
      data,
      selectedDate,
      selectedUser,
      selectedOperator,
    });
    setFilteredData(filteredByMonthData.reverse());
  };

  const handleFilterByYear = ({
    data,
    selectedDate,
    selectedUser,
    selectedOperator,
  }) => {
    const filteredByYearData = filterByYear({
      data,
      selectedDate,
      selectedUser,
      selectedOperator,
    });
    setFilteredData(filteredByYearData.reverse());
  };

  const filterByOption = ({
    data,
    selectedOption,
    selectedDate,
    selectedUser,
    selectedOperator,
  }) => {
    switch (selectedOption?.code) {
      case "week":
        handleFilterByWeek({
          data,
          selectedDate,
          selectedUser,
          selectedOperator,
        });
        break;

      case "month":
        handleFilterByMonth({
          data,
          selectedDate,
          selectedUser,
          selectedOperator,
        });

        break;

      case "year":
        handleFilterByYear({
          data,
          selectedDate,
          selectedUser,
          selectedOperator,
        });

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
