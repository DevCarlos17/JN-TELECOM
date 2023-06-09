import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext.jsx";

const useContactForm = () => {
  const initialState = { vendedor: "", telefono: "", estado: "" };
  const [contactForm, setContactForm] = useState(initialState);
  const [empleados, setEmpleados] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [registerState, setRegisterState] = useState(false);
  console.log(contactForm, "hook");
  const { getEmployees } = useUserContext();

  const onSubmit = async (contact) => {
    console.log(contact);
    setContactos([...contactos, contact]);
    setRegisterState(true);
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
    getEmployees().then((res) => setEmpleados(res));
  }, []);

  return {
    contactos,
    contactForm,
    empleados,
    registerState,
    setContactForm,
    validateContactForm,
    onSubmit,
    handleInput,
  };
};

export default useContactForm;
