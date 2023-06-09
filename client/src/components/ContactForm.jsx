import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { RiUserLine } from "react-icons/ri";
import useContactForm from "../hooks/useContactForm.jsx";
import { HiOutlinePhoneArrowDownLeft } from "react-icons/hi2";

const ContactForm = ({ editMode, selectedCustomer }) => {
  console.log(selectedCustomer);
  const {
    contactForm,
    empleados,
    validateContactForm,
    onSubmit,
    registerState,
    setContactForm,
    handleInput,
  } = useContactForm();

  useEffect(() => {
    if (editMode) {
      setContactForm({ ...contactForm, ...selectedCustomer });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-[-70px]">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-2xl text-center uppercase font-bold tracking-[5px] text-primary mb-16">
          {editMode ? "Editar " : "Registar"}
          <span className="text-white">contacto</span>
        </h1>
        <Formik
          initialValues={contactForm}
          validate={validateContactForm}
          onSubmit={onSubmit}>
          {({ values, errors }) => (
            <Form className="mb-8">
              {/*SELLER*/}
              <div className="relative mb-5">
                <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <Field
                  onChange={handleInput}
                  as="select"
                  name="vendedor"
                  id="vendedor"
                  className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                  {editMode ? (
                    <option value={contactForm.vendedor}>
                      {contactForm.vendedor}
                    </option>
                  ) : (
                    <option value="vendedor">Seleccionar vendedor</option>
                  )}

                  {empleados.map((emp) => (
                    <option key={emp.username} value={emp.username}>
                      {emp.username}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="vendedor"
                  component={() => (
                    <div className="text-primary text-sm absolute">
                      {errors.vendedor}
                    </div>
                  )}
                />
              </div>
              {/*PHONENUMBER*/}
              <div className="relative mb-5">
                <HiOutlinePhoneArrowDownLeft className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <Field
                  value={contactForm.telefono}
                  onChange={handleInput}
                  name="telefono"
                  type="number"
                  className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                  placeholder="Numero de telefono"
                />
                <ErrorMessage
                  name="telefono"
                  component={() => (
                    <div className="text-primary text-sm absolute">
                      {errors.telefono}
                    </div>
                  )}
                />
              </div>
              {/*STATE*/}
              <div className="relative mb-5">
                <Field
                  onChange={handleInput}
                  value={contactForm.estado}
                  as="textarea"
                  name="estado"
                  type="text"
                  className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                  placeholder="Estado"
                />
                <ErrorMessage
                  name="estado"
                  component={() => (
                    <div className="text-primary text-sm absolute">
                      {errors.estado}
                    </div>
                  )}
                />
              </div>

              {/*BUTTONS*/}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
                  Registrar
                </button>
                {registerState && (
                  <p className="text-sm text-primary mt-2">
                    Registrado con exito!
                  </p>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
