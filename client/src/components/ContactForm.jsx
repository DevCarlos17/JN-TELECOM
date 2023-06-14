import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RiUserLine } from "react-icons/ri";
import useFormContact from "../hooks/useFormContact.jsx";
import { HiOutlinePhoneArrowDownLeft } from "react-icons/hi2";

const ContactForm = ({ editMode, selectedCustomer, handleModal }) => {
  const {
    contactForm,
    employees,
    onSubmit,
    onUpdate,
    registerState,
    setContactForm,
    handleInput,
  } = useFormContact();

  const handleSumbit = async (e) => {
    e.preventDefault();

    const isUpdated = editMode && (await onUpdate());
    const isSubmit = !editMode && (await onSubmit());

    if (isUpdated || isSubmit) {
      handleModal();
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
          {!editMode && "Registrar"}
          <span className="text-white">contacto</span>
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
    </div>
  );
};

export default ContactForm;
