import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext.jsx";
import { useContactContext } from "../context/contactContext.jsx";
import { v4 as UUID } from "uuid";
import { useScheduledContactContext } from "../context/scheduledContactContext.jsx";

const useFormContact = ({ isScheduled }) => {
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
  const { createScheduledContact, updateScheduledContact } =
    useScheduledContactContext();

  const [statusFormContact, setStatusFormContact] = useState(null);

  const onSubmit = async () => {
    if (!isScheduled) {
      const response = await createContact(contactForm);
      setStatusFormContact(response);
      return response;
    } else {
      const response = await createScheduledContact(contactForm);
      return response;
    }
  };

  const onUpdate = async () => {
    if (!isScheduled) {
      const response = await updateContact(contactForm);
      return response;
    } else {
      const res = await updateScheduledContact(contactForm);
      console.log("contacto-update", res);
      return res;
    }
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
    statusFormContact,
    setStatusFormContact,
  };
};

export default useFormContact;
