import React from "react";

const ModalUpdatedSale = ({
  setStatusUpdatedSale,
  statusUpdatedSale,
  handleModal,
  handleModalEdit,
}) => {
  const closeModal = () => {
    if (statusUpdatedSale?.data?.status) {
      handleModal();
      handleModalEdit();
    } else {
      handleModal();
    }
  };

  return (
    <div className=" bg-secondary-100 p-6 rounded-xl shadow-2xl min-w-min">
      <span className=" uppercase">{statusUpdatedSale?.data?.message} </span>
      <hr className="my-4 border-gray-500/30" />
      <div className="flex justify-center">
        <button
          onClick={closeModal}
          className="bg-primary text-black uppercase font-bold text-sm min-w-min py-2 px-2 rounded-lg hover:bg-primary/80 transition-colors">
          aceptar
        </button>
      </div>
    </div>
  );
};

export default ModalUpdatedSale;
