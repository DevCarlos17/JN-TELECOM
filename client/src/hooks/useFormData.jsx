import { useEffect, useState } from "react";
import { v4 as UUID } from "uuid";
import { useSalesContext } from "../context/salesContext.jsx";
import { useUserContext } from "../context/userContext.jsx";

import {
  PLANS_ADITIONAL,
  departaments,
  provincies,
  districts,
  PLANS_PACKAGES,
} from "../helper/PeruData.js";
import { ROL } from "../helper/Roles.js";

const useFormData = () => {
  const { user } = useUserContext();

  //Form State
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    documentoTipo: "",
    numeroDocumento: "",
    telefonoContacto: "",
    telefonoReferencia: "",
    email: "",
    departamento: "",
    provincia: "",
    distrito: "",
    vendedor: "",
    supervisor: "",
    servicioTipo: "",
    predio: "",
    coordenadas: "",
    direccion: "",
    observacion: "",
    estado: "",
    result: "VENTA",
    aditional: "",
    plan: "",
    mesh: "",
    totalPayment: "",
    id: UUID(),
    images: [],
  });

  const [statusFormSale, setStatusFormSale] = useState(false);
  const [statusUpdatedSale, setStatusUpdatedSale] = useState(false);

  //Inputs States
  const [provincieInput, setPronvincieInput] = useState("");
  const [districtInput, setDistrictIput] = useState("");
  const [departament, setDepartament] = useState("");
  const [provincie, setProvincie] = useState("");
  const [district, setDistrict] = useState("");
  const [aditional, setAditional] = useState(0);
  const [planPackages, setPlanPackages] = useState(0);
  const [fullPayment, setFullPayment] = useState("Soles a pagar");
  const { postSale, putSale } = useSalesContext();

  //Handles
  const handleFormData = () => {
    if (user?.rol === ROL.SUPERVISOR) {
      setFormData({
        ...formData,
        ["vendedor"]: user?.username,
        ["supervisor"]: user?.username,
      });
    }
    if (user?.rol === ROL.ADMIN) {
      setFormData({
        ...formData,
        ["vendedor"]: user?.username,
        ["supervisor"]: user?.username,
      });
    }
    if (user?.rol === ROL.EMPLOYEE) {
      setFormData({
        ...formData,
        ["vendedor"]: user?.username,
        ["supervisor"]: user?.supervisor,
      });
    }
  };
  const handleTotalPay = () => {
    const totalPayment =
      aditional.price + (planPackages.price ? planPackages.price : 0);
    setFullPayment(totalPayment);
    setFormData({ ...formData, ["totalPayment"]: totalPayment });
  };
  const handleAditional = (e) => {
    const selectedAditionalId = e.target.value;
    const selectedAditional = PLANS_ADITIONAL.find(
      (aditional) => aditional.id == selectedAditionalId
    );
    setAditional(selectedAditional);

    setFormData({
      ...formData,
      ["aditional"]: JSON.stringify(selectedAditional),
    });
  };
  const handlePlanPackages = (e) => {
    const selectedPlanId = e.target.value;
    const selectedPlan = PLANS_PACKAGES.find(
      (plan) => plan.id == selectedPlanId
    );
    setPlanPackages(selectedPlan);
    setFormData({ ...formData, ["plan"]: JSON.stringify(selectedPlan) });
  };
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleInputFile = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, ["images"]: [...files] });
  };
  const handleDeparament = (e) => {
    setDepartament(e.target.value);
    setPronvincieInput(provincies[e.target.value]);
  };
  const handleProvincie = (e) => {
    setProvincie(e.target.value);
    setDistrictIput(districts[e.target.value]);
  };

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  //Handles States
  const handleStatusUpdatedSale = () =>
    setStatusUpdatedSale(!statusUpdatedSale);

  //On Submit
  const createSale = async (e) => {
    const response = await postSale(formData);

    if (response.status) {
      setStatusFormSale(response);
      e.target.reset();
    } else {
      setStatusFormSale(response);
    }
  };

  const editSale = async (e) => {
    const response = await putSale(formData);
    setStatusUpdatedSale(response);
  };

  useEffect(() => {
    handleFormData();
  }, [user]);

  return {
    handleInput,
    handleInputFile,
    createSale,
    editSale,
    statusFormSale,
    setStatusFormSale,
    provincieInput,
    districtInput,
    handleAditional,
    handlePlanPackages,
    aditional,
    planPackages,
    fullPayment,
    handleTotalPay,
    user,
    handleDeparament,
    handleProvincie,
    handleDistrict,
    departaments,
    provincies,
    districts,
    PLANS_PACKAGES,
    PLANS_ADITIONAL,
    setAditional,
    setPlanPackages,
    setFormData,
    setFullPayment,
    statusUpdatedSale,
    setStatusUpdatedSale,
    formData,
    setPronvincieInput,
    departament,
    provincie,
    district,
  };
};

export default useFormData;
