import React, { useState } from "react";

const useSideBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const handleShowSideBar = () => setShowSideBar(!showSideBar);

  return { showSideBar, handleShowSideBar };
};

export default useSideBar;
