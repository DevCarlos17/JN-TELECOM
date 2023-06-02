import React, { useState, useEffect, useRef } from "react";

const useSideBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [clickedHeaderButton, setClickedHeaderButton] = useState(false);
  const sideBarRef = useRef(null);

  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
    setClickedHeaderButton(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target) &&
        !clickedHeaderButton
      ) {
        setShowSideBar(false);
      }
      setClickedHeaderButton(false);
    };

    const handleEscapeKey = (event) => {
      if (event.keyCode === 27) {
        setShowSideBar(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [clickedHeaderButton]);

  return { showSideBar, handleShowSideBar, sideBarRef };
};

export default useSideBar;
