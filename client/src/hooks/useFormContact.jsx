import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext.jsx";
import { useContactContext } from "../context/contactContext.jsx";
import useModalContact from "./useModalContact.jsx";
import { v4 as UUID } from "uuid";

const useFormContact = () => {
  const [contactForm, setContactForm] = useState({
    vendedor: "",
    telefono: "",
    etiqueta: "",
    estado: "",
    id: UUID(),
  });
  const [registerState, setRegisterState] = useState(false);
  const [employees, setEmployees] = useState([]);
  const { getEmployees } = useUserContext();
  const { createContact, updateContact } = useContactContext();

  const onSubmit = async () => {
    const response = await createContact(contactForm);
    return response.status;
  };

  const onUpdate = async () => {
    const response = await updateContact(contactForm);
    return response.status;
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const validateContactForm = (values) => {
    let error = {};

    //Validate fullname seller
    if (!values.vendedor) {
      error.vendedor = "Por favor Ingresa el nombre del vendedor";
    }

    //Validate phoneNumber
    if (!values.telefono) {
      error.telefono = "Por favor Ingresa un numero de telefono";
    }

    //Validate state
    if (!values.estado) {
      error.estado = "Por favor ingresa una estado";
    }

    return error;
  };

  useEffect(() => {
    getEmployees().then((res) => setEmployees(res));
  }, []);

  return {
    contactForm,
    employees,
    registerState,
    setContactForm,
    validateContactForm,
    onSubmit,
    onUpdate,
    handleInput,
  };
};

export default useFormContact;
