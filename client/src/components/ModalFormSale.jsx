import React from "react";

const ModalFormSale = ({
  handleModalFormSale,
  statusForm,
  setStatusFormSale,
}) => {
  return (
    statusForm && (
      <div className=" bg-secondary-100 p-6 rounded-xl shadow-2xl min-w-min">
        <span className=" uppercase">{statusForm?.message}</span>
        <hr className="my-4 border-gray-500/30" />
        <div className="flex justify-center">
          <button
            onClick={() => {
              setStatusFormSale(false), handleModalFormSale();
            }}
            className="bg-primary text-black uppercase font-bold text-sm min-w-min py-2 px-2 rounded-lg hover:bg-primary/80 transition-colors">
            aceptar
          </button>
        </div>
      </div>
    )
  );
};

export default ModalFormSale;
