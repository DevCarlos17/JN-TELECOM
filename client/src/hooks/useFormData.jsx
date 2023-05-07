import React, { useState } from "react";
import { v4 as UUID } from "uuid";
import { useSalesContext } from "../context/salesContext.jsx";
import { useUserContext } from "../context/userContext.jsx";

const useFormData = () => {
  const { user } = useUserContext();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documentoTipo: "",
    numeroDocumento: "",
    telefonoContacto: "",
    telefonoReferencia: "",
    departamento: "",
    provincia: "",
    distrito: "",
    vendedor: user?.username,
    supervisor: user?.supervisor,
    servicioTipo: "",
    casaTipo: "",
    direccion: "",
    observacion: "",
    estado: "VENTA",
    id: UUID(),
  });
  const [statusFormSale, setstatusFormSale] = useState("");
  const { postSale } = useSalesContext();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await postSale(formData);

    e.target.reset();
    if (response.status) {
      setstatusFormSale("Se registro con exito");
      setTimeout(() => {
        setstatusFormSale("");
      }, 1500);
    } else {
      setstatusFormSale("Ha ocurrido con un error");
    }
  };

  return { handleInput, onSubmit, statusFormSale };
};

export default useFormData;
