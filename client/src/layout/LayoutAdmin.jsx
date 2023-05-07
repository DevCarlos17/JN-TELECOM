import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import useSideBar from "../hooks/useSideBar.jsx";
import { useUserContext } from "../context/userContext.jsx";
import LogoutButton from "../components/LogoutBtn.jsx";

const LayoutAdmin = () => {
  const { showSideBar, handleShowSideBar } = useSideBar();

  const { user, getEmployees } = useUserContext();

  return (
    <div className={"min-h-screen grid"}>
      <Sidebar
        props={{
          showSideBar,
          handleShowSideBar,
          user,
          LogoutButton,
          getEmployees,
        }}
      />
      <div className="col-span-6">
        <Header
          props={{
            showSideBar,
            handleShowSideBar,
            user,
            LogoutButton,
          }}
        />
        <div className="h-[93vh] overflow-y-scroll ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
