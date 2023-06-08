import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//icons
import {
  RiBarChart2Line,
  RiEarthLine,
  RiMessage3Line,
  RiLoginCircleLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import JNTELECOM from "../assets/LogoEmpresa.ico";
import useEmployees from "../hooks/useEmployees.jsx";
import { ROL } from "../helper/Roles.js";
import useSupervisors from "../hooks/useSupervisors.jsx";
import { useSalesContext } from "../context/salesContext.jsx";
import { selectClasses } from "@mui/material";

const SideBar = ({ props }) => {
  const { showSideBar, sideBarRef, handleShowSideBar, user, LogoutButton } =
    props;
  const { clearFilterBySeller, filterSaleBySupervisor, filterSaleBySeller } =
    useSalesContext();
  const { employees, filterEmployeesBySupervisor } = useEmployees();
  const { supervisors } = useSupervisors();

  const [showSubmenuEmployee, setShowSubmenuEmployee] = useState(false);
  const [showSubmenuSupervisor, setShowSubmenuSupervisor] = useState(false);

  const navigate = useNavigate();

  //Handle selectedSeller
  const handleSellerChange = (seller) => {
    filterSaleBySeller(seller);
    navigate("/ventas");
  };

  //Handle selectedSupervisor
  const handleSupervisorChange = (supervisor) => {
    filterSaleBySupervisor(supervisor);
    navigate("/ventas");
  };

  return (
    <div
      ref={sideBarRef}
      className={`bg-secondary-100  h-[100vh] xl:w-auto lg:w-[30%] md:w-[40%] fixed top-0 p-8 flex flex-col justify-between z-50 ${
        showSideBar ? "left-0" : "-left-full"
      } transition-all`}>
      <div>
        {/* TITULO*/}
        <div className="flex justify-around items-center mb-8">
          <h1 className="text-center text-2xl font-bold text-white px-8">
            <Link to="/">
              <div className=" flex justify-center pb-4">
                <img src={JNTELECOM} alt="" className="h-24 rounded-full" />
              </div>
              J&N TELECOM
            </Link>
          </h1>

          <button onClick={handleShowSideBar}>
            <RiArrowRightSLine className="rotate-180 text-primary" />
          </button>
        </div>
        {user && (
          <ul>
            {/* BUTTON CREEATE SALE*/}
            <li>
              <Link
                to="/newSale"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
                <RiBarChart2Line className="text-primary" />
                Ingresar Ventas
              </Link>
            </li>
            {/* BUTTON GLOBAL SALES*/}
            {user.rol === ROL.ADMIN || user.rol === ROL.SUPERVISOR ? (
              <li>
                <Link
                  to="/ventas"
                  className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
                  <RiEarthLine className="text-primary" />
                  Ventas Globales
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/ventas"
                  className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
                  <RiEarthLine className="text-primary" />
                  Mis ventas
                </Link>
              </li>
            )}

            {/* DROPDOW VENTA*/}

            {/*SALES BY SUPERVISOR*/}
            {user.rol === ROL.ADMIN && (
              <>
                <li>
                  <button
                    onClick={() =>
                      setShowSubmenuSupervisor(!showSubmenuSupervisor)
                    }
                    className="flex items-center w-full gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors">
                    <span>
                      <RiEarthLine className="text-primary" />
                    </span>
                    <span>Ventas por supervisor</span>
                    <RiArrowRightSLine
                      className={`${
                        showSubmenuSupervisor && "rotate-90"
                      } transition-all`}
                    />
                  </button>
                </li>
                <ul
                  className={`${
                    showSubmenuSupervisor ? "h-[200 px]" : "h-0"
                  } overflow-y-hidden transition-all`}>
                  {supervisors &&
                    supervisors.map((supervisor, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleSupervisorChange(supervisor.username)
                        }
                        className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white">
                        {supervisor.username}
                      </li>
                    ))}
                </ul>
              </>
            )}

            {/*SALES BY EMPLOYEES*/}
            {(user.rol === ROL.ADMIN || user.rol === ROL.SUPERVISOR) && (
              <>
                <li>
                  <button
                    onClick={() => setShowSubmenuEmployee(!showSubmenuEmployee)}
                    className="flex items-center w-full gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors">
                    <span>
                      <RiEarthLine className="text-primary" />
                    </span>
                    <span>Ventas por empleado</span>
                    <RiArrowRightSLine
                      className={`${
                        showSubmenuEmployee && "rotate-90"
                      } transition-all`}
                    />
                  </button>
                </li>
                <ul
                  className={`${
                    showSubmenuEmployee ? "h-[200 px]" : "h-0"
                  } overflow-y-hidden transition-all`}>
                  {user.rol === ROL.ADMIN &&
                    employees.map((employee, index) => (
                      <li
                        key={index}
                        onClick={() => handleSellerChange(employee.username)}
                        className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white">
                        {employee.username}
                      </li>
                    ))}

                  {user.rol === ROL.SUPERVISOR &&
                    filterEmployeesBySupervisor(user.username).map(
                      (employee, index) => (
                        <li key={index}>
                          <Link
                            to={`/sales/${employee.username}`}
                            className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white">
                            {employee.username}
                          </Link>
                        </li>
                      )
                    )}
                </ul>
                {user.rol === ROL.ADMIN && (
                  <li>
                    <Link
                      to="/signup"
                      className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
                      <RiMessage3Line className="text-primary" />
                      Registrar Usuario
                    </Link>
                  </li>
                )}
                {user.rol === ROL.ADMIN && (
                  <li>
                    <Link
                      to="/"
                      className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
                      <RiMessage3Line className="text-primary" />
                      Contactos
                    </Link>
                  </li>
                )}
              </>
            )}
            {/* OTHER BUTTONS*/}
          </ul>
        )}
      </div>
      {/* LOGOUT*/}
      <nav>
        {user ? (
          <LogoutButton />
        ) : (
          <Link
            to="/"
            className="w-full flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
            <RiLoginCircleLine className="text-primary" />
            Iniciar sesión
          </Link>
        )}
      </nav>
    </div>
  );
};

export default SideBar;
