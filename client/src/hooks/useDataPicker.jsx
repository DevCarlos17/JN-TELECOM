import React, { useState } from "react";

const useDataPicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const clearDataPicker = () => {
    setSelectedDate(null);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.value;
    setSelectedDate(selectedDate);
  };

  return { selectedDate, handleDateChange, clearDataPicker };
};

export default useDataPicker;
