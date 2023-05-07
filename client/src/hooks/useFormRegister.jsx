import { useState } from "react";
import { useUserContext } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

const useFormRegister = () => {
  const [formRegister, setFormRegister] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    isAdmin: "",
    supervisor: "",
  });
  const [registerState, setRegisterState] = useState(false);

  const { createUser } = useUserContext();
  const navigate = useNavigate();
  const validateFormSignup = (values) => {
    let error = {};

    //Validate Username
    if (!values.username) {
      error.username = "Por favor Ingresa un nombre de usuario";
    }

    //Validate Email
    if (!values.email) {
      error.email = "Por favor Ingresa un correo";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
    ) {
      error.email =
        "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo";
    }

    //Validate Password
    if (!values.password) {
      error.password = "Por favor ingresa una contraseña";
    }

    //Validate Password2
    if (!values.password2) {
      error.password2 = "Por favor ingresa una contraseña";
    }

    //validate User Rol
    if (!values.isAdmin) {
      error.isAdmin = "Debe seleccion un rol";
    }

    //Validate supervisor
    if (!values.supervisor) {
      error.supervisor = "Debe seleccion un supervisor";
    }

    return error;
  };

  const onSubmit = async (data, e) => {
    const permissions = await createUser(data);

    if (permissions.auth) {
      setRegisterState(true);
      e.resetForm();
      setTimeout(() => navigate("/"), 1000);
    } else {
      e.setFieldError(permissions.field, permissions.error);
    }
  };
  return { formRegister, registerState, onSubmit, validateFormSignup };
};

export default useFormRegister;
