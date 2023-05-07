import React, { useState } from "react";
import LogeEmpresa from "../../assets/LogoEmpresa.ico";
import { Field, Form, Formik, ErrorMessage } from "formik";

//Icons
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
  RiUserLine,
} from "react-icons/ri";
import useFormRegister from "../../hooks/useFormRegister.jsx";
import useSupervisors from "../../hooks/useSupervisors.jsx";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { formRegister, registerState, onSubmit, validateFormSignup } =
    useFormRegister();
  const { supervisors } = useSupervisors();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <Formik
          initialValues={formRegister}
          validate={validateFormSignup}
          onSubmit={onSubmit}>
          {({ errors }) => (
            <Form className="mb-8">
              <div className="w-full flex justify-center pb-4">
                <img src={LogeEmpresa} alt="" className="h-24 rounded-full" />
              </div>
              <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
                Crear <span className="text-primary">cuenta</span>
              </h1>

              <div className="relative mb-5">
                <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <Field
                  name="username"
                  type="text"
                  className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                  placeholder="Nombre de usuario"
                />
                <ErrorMessage
                  name="username"
                  component={() => (
                    <div className="text-primary text-sm absolute">
                      {errors.username}
                    </div>
                  )}
                />
              </div>
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
              <div className="relative mb-5">
                <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                  placeholder="Contraseña"
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
              <div className="relative mb-5">
                <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <Field
                  name="password2"
                  type={showPassword ? "text" : "password"}
                  className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                  placeholder="Contraseña"
                />
                <ErrorMessage
                  name="password2"
                  component={() => (
                    <div className="text-primary text-sm absolute">
                      {errors.password2}
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
              <div className="relative mb-5">
                <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <label htmlFor="isAdmin" />
                <Field
                  as="select"
                  name="isAdmin"
                  id="isAdmin"
                  className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                  <option defaultValue>Rol de usuario</option>
                  <option value={false}>Empleado</option>
                  <option value={true}>Administrador</option>
                </Field>
                <ErrorMessage
                  name="isAdmin"
                  component={() => (
                    <div className="text-primary text-sm absolute">
                      {errors.isAdmin}
                    </div>
                  )}
                />
              </div>
              <div className="relative mb-5">
                <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <label htmlFor="supervisor" />
                <Field
                  as="select"
                  name="supervisor"
                  id="supervisor"
                  className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                  <option defaultValue>Supervisor a cargo</option>
                  {supervisors &&
                    supervisors.map((supervisor) => (
                      <option
                        key={supervisor.username}
                        value={supervisor.username}>
                        {supervisor.username}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="supervisor"
                  component={() => (
                    <div className="text-primary text-sm absolute">
                      {errors.supervisor}
                    </div>
                  )}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
                  Registrar Empleado
                </button>
                {registerState && (
                  <p className="text-sm text-primary mt-2">
                    Usuario registrado con exito!
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

export default Signup;
