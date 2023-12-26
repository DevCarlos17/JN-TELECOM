import { RiArrowDownSLine, RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import JNTELECOM from "../assets/LogoEmpresa.ico";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import FinanceMenu from "./FinanceMenu.jsx";
import { ROL } from "../helper/Roles.js";
import { FaPlayCircle } from "react-icons/fa";

const Header = ({ props }) => {
  const { showSideBar, handleShowSideBar, user, LogoutButton } = props;

  return (
    <header className="h-[7vh] md:h-[7vh] border-b border-secondary-100 p-8 flex items-center justify-between">
      <div className="flex gap-x-32">
        <button
          id="openSidebarButton"
          onClick={handleShowSideBar}
          className=" bg-primary text-black p-2 rounded-full transition-all">
          {showSideBar ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
        {user && user.rol === ROL.ADMIN && (
          <>
            <Link
              to={"/streaming/accounts"}
              className=" hover:bg-streaming p-1 rounded-lg transition-colors hover:text-white font-bold flex justify-center items-center gap-x-2">
              Streaming
              <FaPlayCircle className="text-lg" />
            </Link>
          </>
        )}
      </div>

      <nav className="flex items-center gap-6">
        {user && (
          <>
            <Link
              to={"/ventas"}
              className=" hover:bg-primary p-1 rounded-lg transition-colors hover:text-black font-bold">
              Inicio
            </Link>

            {(user.rol === ROL.ADMIN ||
              user.canSeeScheduledContact === true) && (
              <Link
                to={"/scheduledContacts"}
                className="hover:bg-primary p-1 rounded-lg transition-colors hover:text-black font-bold">
                Agendados
              </Link>
            )}
            {(user.rol === ROL.ADMIN || user.canSeeContact === true) && (
              <Link
                to={"/contacts"}
                className="hover:bg-primary p-1 rounded-lg transition-colors hover:text-black font-bold">
                Contactos
              </Link>
            )}

            {user.rol === ROL.ADMIN && (
              <>
                <Link
                  to={"/crecimiento-vertical"}
                  className=" hover:bg-primary p-1 rounded-lg transition-colors hover:text-black font-bold">
                  Crecimiento Vertical
                </Link>
                <FinanceMenu />
              </>
            )}
          </>
        )}
        {user ? (
          <Menu
            menuButton={
              <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors font-bold">
                <p>{user?.username}</p>
                <RiArrowDownSLine />
              </MenuButton>
            }
            arrow
            transition
            align="end"
            arrowClassName="bg-secondary-100"
            menuClassName="bg-secondary-100 p-4">
            <MenuItem className="p-0 hover:bg-transparent">
              <button className=" rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1">
                <img
                  src={JNTELECOM}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="flex items-start flex-col text-sm">
                  <span className="text-sm">{user?.username}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </div>
              </button>
            </MenuItem>
            <hr className="my-4 border-gray-500" />

            <MenuItem className="p-0 hover:bg-transparent">
              <LogoutButton />
            </MenuItem>
          </Menu>
        ) : (
          <Link
            to="/"
            className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-100 flex items-center gap-x-4 py-2 px-6 flex-1">
            Iniciar sesión
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
