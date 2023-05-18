import React, { useState } from "react";

const useModalViewInfo = () => {
  const [abrir, setAbrir] = useState(false);

  const handleAbrir = () => setAbrir(!abrir);

  return { abrir, handleAbrir };
};

export default useModalViewInfo;
