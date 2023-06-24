import React, { useState } from "react";

const useSelectOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOption = (e) => setSelectedOption(e.value);

  return { selectedOption, handleOption };
};

export default useSelectOptions;
