import React, { useEffect } from "react";
import { RiUserLine } from "react-icons/ri";
import useFormContact from "../hooks/useFormContact.jsx";
import { HiOutlinePhoneArrowDownLeft } from "react-icons/hi2";
import { Modal } from "@mui/material";
import useModalStatusContact from "../hooks/useModalStatusContact.jsx";
import ModalStatusContact from "./ModalStatusContact.jsx";

const ScheduledContactForm = ({ editMode, selectedCustomer, handleModal }) => {
  const {
    contactForm,
    employees,
    onSubmit,
    onUpdate,
    registerState,
    setContactForm,
    handleInput,
    statusFormContact,
  } = useFormContact();

  const { openModalStatusContact, handleModalStatusContact } =
    useModalStatusContact();

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await onUpdate();
      handleModal();
    } else {
      onSubmit();
      handleModalStatusContact();
    }
  };

  useEffect(() => {
    if (editMode) {
      setContactForm({ ...contactForm, ...selectedCustomer });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-[-70px]">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-2xl text-center uppercase font-bold tracking-[5px] text-primary mb-16">
          {editMode && "Editar"}
          {!editMode && "Agendar"}
          <span className="text-white"> contacto</span>
        </h1>
        <form onSubmit={handleSumbit} className="mb-8">
          {/*SELLER*/}
          <div className="relative mb-5">
            <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
            <select
              name="vendedor"
              id="vendedor"
              onChange={handleInput}
              className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
              {editMode ? (
                <option value={contactForm.vendedor}>
                  {contactForm.vendedor}
                </option>
              ) : (
                <option value="vendedor">Seleccionar vendedor</option>
              )}

              {employees.map((emp) => (
                <option key={emp.username} value={emp.username}>
                  {emp.username}
                </option>
              ))}
            </select>
          </div>
          {/*PHONENUMBER*/}
          <div className="relative mb-5">
            <HiOutlinePhoneArrowDownLeft className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
            <input
              value={contactForm.telefono}
              onChange={handleInput}
              name="telefono"
              type="number"
              className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
              placeholder="Numero de telefono"
            />
          </div>
          {/*TAG*/}
          <div className="relative mb-5">
            <textarea
              value={contactForm.etiqueta}
              onChange={handleInput}
              name="etiqueta"
              className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
              placeholder="Etiqueta"
            />
          </div>
          {/*STATE*/}
          <div className="relative mb-5">
            <textarea
              value={contactForm.estado}
              onChange={handleInput}
              name="estado"
              className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
              placeholder="Estado"
            />
          </div>

          {/*BUTTONS*/}
          <div className="text-center">
            {editMode && (
              <button
                type="submit"
                className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
                Actualizar
              </button>
            )}
            {!editMode && (
              <button
                type="submit"
                className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
                Registrar
              </button>
            )}
            {registerState && (
              <p className="text-sm text-primary mt-2">Registrado con exito!</p>
            )}
          </div>
        </form>
      </div>
      <Modal
        open={openModalStatusContact}
        onClose={handleModalStatusContact}
        className="flex items-center p-8 md:h-full justify-center">
        <ModalStatusContact
          handleModal={handleModal}
          statusFormContact={statusFormContact}
        />
      </Modal>
    </div>
  );
};

export default ScheduledContactForm;
