import React, { useState } from "react";
import { Link } from "react-router-dom";
//icons
import {
  RiBarChart2Line,
  RiEarthLine,
  RiMessage3Line,
  RiLogoutCircleLine,
  RiLoginCircleLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import JNTELECOM from "../assets/LogoEmpresa.ico";
import useEmployees from "../hooks/useEmployees.jsx";

const SideBar = ({ props }) => {
  const { showSideBar, handleShowSideBar, user, LogoutButton } = props;
  const { employees } = useEmployees();

  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <>
      <div
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
                <span className="text-primary text-4xl"> .</span>
              </Link>
            </h1>

            <button onClick={handleShowSideBar}>
              <RiArrowRightSLine className="rotate-180 text-primary" />
            </button>
          </div>
          {user && (
            <ul>
              {/* BUTTON VENTA*/}
              {user.isAdmin ? (
                <li>
                  <Link
                    to="/sales"
                    className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
                    <RiEarthLine className="text-primary" />
                    Ventas Globales
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/mySales"
                    className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
                    <RiEarthLine className="text-primary" />
                    Mis ventas
                  </Link>
                </li>
              )}
              {/* BUTTON INGRESAR VENTA*/}
              <li>
                <Link
                  to="/newSale"
                  className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
                  <RiBarChart2Line className="text-primary" />
                  Ingresar Ventas
                </Link>
              </li>
              {/* DROPDOW VENTA*/}

              {user.isAdmin && (
                <>
                  <li>
                    <button
                      onClick={() => setShowSubmenu(!showSubmenu)}
                      className="flex items-center w-full gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors">
                      <span>
                        <RiEarthLine className="text-primary" />
                      </span>
                      <span>Ventas por empleado</span>
                      <RiArrowRightSLine
                        className={`${
                          showSubmenu && "rotate-90"
                        } transition-all`}
                      />
                    </button>
                  </li>
                  <ul
                    className={`${
                      showSubmenu ? "h-[200 px]" : "h-0"
                    } overflow-y-hidden transition-all`}>
                    {employees &&
                      employees.map((employee) => (
                        <li>
                          <Link
                            to={`/sales/${employee.username}`}
                            className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white">
                            {employee.username}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <li>
                    <Link
                      to="/signup"
                      className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
                      <RiMessage3Line className="text-primary" />
                      Registrar empleado
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
                      <RiMessage3Line className="text-primary" />
                      Contactos
                    </Link>
                  </li>
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
              to="/signin"
              className="w-full flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900">
              <RiLoginCircleLine className="text-primary" />
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default SideBar;
