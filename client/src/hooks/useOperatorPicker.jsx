import React, { useState } from "react";

const useOperatorPicker = () => {
  const [selectedOperator, setSelectedOperator] = useState(null);

  const handleOperator = (e) => setSelectedOperator(e.value);

  const clearOperator = () => setSelectedOperator(null);

  return { selectedOperator, handleOperator, clearOperator };
};

export default useOperatorPicker;
