import React, { useState } from "react";
import { v4 as UUID } from "uuid";
import { useSalesContext } from "../context/salesContext.jsx";
import { useUserContext } from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [statusFormSale, setstatusFormSale] = useState("");
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

    if (response?.status) {
      console.log(response.data.message);
      setstatusFormSale(response.data.message);
      setTimeout(() => {
        setstatusFormSale("");
        e.target.reset();
        user.isAdmin ? navigate("/sales") : navigate("/mySales");
      }, 1500);
    } else {
      setstatusFormSale(response.error);
    }
  };

  return { handleInput, handleInputFile, onSubmit, statusFormSale };
};

export default useFormData;
