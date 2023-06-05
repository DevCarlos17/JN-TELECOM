import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <div className=" h-[90%] flex justify-center p-4">
      <Outlet />
    </div>
  );
};

export default LayoutAuth;
