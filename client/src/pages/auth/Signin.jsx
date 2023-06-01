import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogeEmpresa from "../../assets/LogoEmpresa.ico";
import { Formik, Form, Field, ErrorMessage } from "formik";

//Icons
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import Cookies from "js-cookie";
import { ROL } from "../../helper/Roles.js";
import { useUserContext } from "../../context/userContext.jsx";

const Signin = () => {
  const navigate = useNavigate();
  const { user, signin, setToken, setLoading } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const [formSignin, setFormSignin] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (data, e) => {
    const permissions = await signin(data);

    if (permissions.auth) {
      setToken(permissions.token);
      Cookies.set("token", permissions.token, { expires: 1 });
      setLoading(false);
    } else {
      e.setFieldError(permissions.field, permissions.error);
    }
  };

  const validateFormSignin = (values) => {
    let error = {};
    if (!values.email) {
      error.email = "Por favor Ingresa un correo";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
    ) {
      error.email =
        "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo";
    }

    if (!values.password) {
      error.password = "Por favor ingresa una contraseña";
    }

    return error;
  };
  useEffect(() => {
    if (user) {
      navigate("/GlobalSales");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <div className="w-full flex justify-center pb-4">
          <img src={LogeEmpresa} alt="" className="h-24 rounded-full" />
        </div>
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-16">
          Iniciar <span className="text-primary">sesión</span>
        </h1>
        <Formik
          initialValues={formSignin}
          validate={validateFormSignin}
          onSubmit={onSubmit}>
          {({ errors }) => (
            <Form className="mb-8">
              <div className="relative mb-5">
                <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <Field
                  name="email"
                  type="email"
                  className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                  placeholder="Correo electronico"
                />
                <ErrorMessage
                  name="email"
                  component={() => (
                    <div className="text-primary text-sm absolute">
                      {errors.email}
                    </div>
                  )}
                />
              </div>
              <div className="relative mb-8">
                <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                  placeholder="contraseña"
                />
                <ErrorMessage
                  name="password"
                  component={() => (
                    <div className="text-primary text-sm absolute">
                      {errors.password}
                    </div>
                  )}
                />
                {showPassword ? (
                  <RiEyeOffLine
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                  />
                ) : (
                  <RiEyeLine
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                  />
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
                  Ingresar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
