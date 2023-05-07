import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useUserContext } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { onLogout } = useUserContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 w-full flex items-center gap-x-4 py-2 px-6 flex-1">
      <RiLogoutCircleLine />
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
