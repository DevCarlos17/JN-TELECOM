import React from "react";

import ContactsTable from "../../components/ContactsTable.jsx";
import MultiSelectUser from "../../components/MultiSelect.jsx";
import { useUserContext } from "../../context/userContext.jsx";
import { ROL } from "../../helper/Roles.js";

const Contacts = () => {
  const { user } = useUserContext();
  return (
    <>
      {user && (
        <div className=" w-[95%] flex flex-col items-center">
          {user.rol === ROL.ADMIN && (
            <div className="text-center bg-secondary-100  rounded mb-5 p-4">
              <span className="text-primary uppercase font-bold">
                Usuarios accesibles Tabla de Contactos
              </span>
              <hr className="my-2 border-gray-500/30" />
              <div className="flex justify-center items-center mt-3">
                <MultiSelectUser />
              </div>
            </div>
          )}
          {(user.rol === ROL.ADMIN || user.canSeeContact === true) && (
            <div className="w-[95%]">
              <ContactsTable />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Contacts;
