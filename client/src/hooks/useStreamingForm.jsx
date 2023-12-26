import { useEffect, useState } from "react";
import { useStreamingContext } from "../context/stramingContext.jsx";
import { toaster } from "../helper/utils.js";

const useStreamingForm = () => {
  const { getAccounts, createAccount, updateAccount, deleteAccount, accounts } =
    useStreamingContext();

  const addMoreUser = () => setNumberUsers((prev) => prev + 1);

  const getUniqueNumbers = (data) => {
    const uniqueNumbers = [
      ...new Set(
        Object.keys(data).map(
          (propiedad) => (/\_(\d+)$/.exec(propiedad) || [])[1]
        )
      ),
    ].filter((num) => num !== undefined);

    return uniqueNumbers;
  };

  const formatForm = (data) => {
    const form = Object.fromEntries(new FormData(data));

    const newForm = {
      plataforma: form.plataforma,
      correo: form.correo,
      contraseña: form.contraseña,
      perfiles: [],
    };

    const uniqueNumbers = getUniqueNumbers(form);

    for (const number of uniqueNumbers) {
      const perfil = {
        vencimiento: form[`vecimiento_${number}`],
        numero: form[`numero_${number}`],
        perfil: form[`perfil_${number}`],
        pin: form[`pin_${number}`],
        precio: form[`precio_${number}`],
        renovacion: form[`renovacion_${number}`],
      };

      newForm.perfiles.push(perfil);
    }

    return newForm;
  };

  const onSubmit = async (e) => {
    const form = formatForm(e.target);
    toaster(createAccount(form));
  };

  const onUpdate = async ({ e, _id }) => {
    const form = formatForm(e.target);
    const formWithId = { ...form, _id };

    toaster(updateAccount(formWithId));
  };

  const onDelete = (account) => {
    toaster(deleteAccount(account));
  };

  return {
    accounts,
    onSubmit,
    onUpdate,
    onDelete,
    deleteAccount,
  };
};

export default useStreamingForm;
