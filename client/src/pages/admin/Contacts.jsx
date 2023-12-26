import React from "react";
import MultiSelectUser from "../../components/MultiSelect.jsx";
import { useUserContext } from "../../context/userContext.jsx";
import { ROL } from "../../helper/Roles.js";
import useMultiSelect from "../../hooks/useMultiSelect.jsx";
import ContactTable from "../../components/ContactTable.jsx";
import { useContactContext } from "../../context/contactContext.jsx";

const Contacts = () => {
  const { user, getEmployees, changeCanSeeContact } = useUserContext();

  const { users, selectedUsers, handleSelect } = useMultiSelect({
    permission: "canSeeContact",
    onChange: changeCanSeeContact,
    getEmployees,
  });

  const { contacts, deleteContact } = useContactContext();

  const dataTable = contacts.map((contact) => {
    return { ...contact, createdAt: new Date(contact.createdAt) };
  });

  return (
    <>
      {user && (
        <div className=" w-[95%] flex flex-col items-center">
          {user?.rol === ROL.ADMIN && (
            <div className="text-center bg-secondary-100  rounded mb-5 p-4">
              <span className="text-primary uppercase font-bold">
                usuarios accesibles a tabla de contactos
              </span>
              <hr className="my-2 border-gray-500/30" />
              <div className="flex justify-center items-center mt-3">
                <MultiSelectUser
                  value={selectedUsers}
                  onChange={handleSelect}
                  options={users}
                />
              </div>
            </div>
          )}
          {(user?.rol === ROL.ADMIN || user?.canSeeContact === true) && (
            <div className="w-[95%]">
              <ContactTable
                dataTable={dataTable}
                deleteContact={deleteContact}
                isScheduled={false}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Contacts;
