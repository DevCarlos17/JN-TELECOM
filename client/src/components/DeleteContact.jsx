import React from "react";

const DeleteContact = ({
  handleModalDeleteContact,
  selectedCustomer,
  deleteContact,
}) => {
  const handleDeleteContact = async () => {
    const res = await deleteContact(selectedCustomer);
    if (res.status) {
      handleModalDeleteContact();
    }
  };

  return (
    <div className=" bg-secondary-100 p-6 rounded-xl shadow-2xl min-w-min">
      <span className=" uppercase">¿Desea eliminar el contacto?</span>
      <hr className="my-4 border-gray-500/30" />
      <div className="flex justify-center gap-4">
        <button
          className="bg-primary text-black uppercase font-bold text-sm w-[3rem] py-2 px-2 rounded-lg hover:bg-primary/80 transition-colors"
          onClick={handleDeleteContact}>
          SI
        </button>
        <button
          className="bg-primary text-black uppercase font-bold text-sm w-[3rem] py-2 px-2 rounded-lg hover:bg-primary/80 transition-colors"
          onClick={handleModalDeleteContact}>
          NO
        </button>
      </div>
    </div>
  );
};

export default DeleteContact;
