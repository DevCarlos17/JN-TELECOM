import React, { useState } from "react";
import { v4 as UUID } from "uuid";
import { useSalesContext } from "../context/salesContext.jsx";
import { useUserContext } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import useModalFormSale from "./useModalFormSale.jsx";

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
    images: [],
  });
  const [statusFormSale, setStatusFormSale] = useState(false);
  const { postSale } = useSalesContext();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputFile = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, ["images"]: [...files] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await postSale(formData);

    if (response.status) {
      setStatusFormSale(response);
      e.target.reset();
    } else {
      setStatusFormSale(response);
    }
  };

  return {
    handleInput,
    handleInputFile,
    onSubmit,
    statusFormSale,
    setStatusFormSale,
  };
};

export default useFormData;
