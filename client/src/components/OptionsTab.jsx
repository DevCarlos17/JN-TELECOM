import React from "react";
import { Link, useLocation } from "react-router-dom";

const OptionsTab = () => {
  const location = useLocation();

  const currentLocation = location.pathname.split("/")[2];

  return (
    <div className="flex justify-center">
      <ul class=" text-sm font-medium text-center rounded-lg shadow sm:flex w-[25vw]">
        <li class="w-full ">
          <Link
            to="/streaming/accounts"
            className={`inline-block w-full p-4 hover:bg-primary hover:text-white rounded-s-lg text-gray border border-gray-700 ${
              currentLocation === "accounts" && "bg-primary text-black"
            }`}>
            Cuentas
          </Link>
        </li>

        <li class="w-full">
          <Link
            to="/streaming/profiles"
            className={`inline-block w-full p-4 hover:bg-primary hover:text-white rounded-e-lg text-gray border border-gray-700 ${
              currentLocation === "profiles" && "bg-primary text-black"
            }`}>
            Profiles
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OptionsTab;
