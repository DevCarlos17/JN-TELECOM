import React, { useEffect, useState } from "react";
import useFormData from "../hooks/useFormData.jsx";

//ICONS
import { BiBuildingHouse } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlinePhoneArrowDownLeft, HiSignal } from "react-icons/hi2";
import { IoDocumentTextOutline, IoDocumentsOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { BsCashStack, BsCartPlus, BsImages } from "react-icons/bs";
import { FaSignal } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

//MODALS
import { Modal } from "@mui/material";
import ModalFormSale from "./ModalFormSale.jsx";
import ModalSaleCompleted from "./ModalSaleCompleted.jsx";
import useModalFormSale from "../hooks/useModalFormSale.jsx";
import ModalUpdatedSale from "./ModalUpdatedSale.jsx";
import useModalUpdatedSale from "../hooks/useModalUpdatedSale.jsx";
import { RESULTS, districts } from "../helper/PeruData.js";
import { ROL } from "../helper/Roles.js";
import { useUserContext } from "../context/userContext.jsx";
import {
  DOCUMENT_TYPES,
  PREDIOS,
  SERVICE_OPERATORS,
} from "../helper/FormData.js";
import { toaster } from "../helper/utils.js";
import { useNavigate } from "react-router-dom";

const FormSale = ({
  btnCancel = false,
  handleModalForm,
  editMode,
  selectedCustomer,
  handleEdit,
  styleModal,
}) => {
  const { getEmployees } = useUserContext();

  const [empleados, setEmpleados] = useState([]);

  const {
    user,
    handleInput,
    handleInputFile,
    createSale,
    editSale,
    statusFormSale,
    setStatusFormSale,
    setFormData,
    handleAditional,
    handlePlanPackages,
    handleTotalPay,
    handleDeparament,
    handleProvincie,
    handleDistrict,
    planPackages,
    aditional,
    departaments,
    PLANS_PACKAGES,
    PLANS_ADITIONAL,
    statusUpdatedSale,
    formData,
    provincies,
  } = useFormData();

  const { isOpenModalUpdatedSale, handleModalUpdatedSale, setStatusUpdated } =
    useModalUpdatedSale();

  const { isOpenModalFormSale, handleModalFormSale } = useModalFormSale();

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      toaster(editSale());
    } else {
      toaster(createSale(e));
      navigate("/ventas");
    }
  };

  const isAdmin = (user) => (user?.rol === ROL.ADMIN ? "" : "disabled");

  useEffect(() => {
    getEmployees().then((res) => setEmpleados(res));

    if (editMode) {
      setFormData({ ...formData, ...selectedCustomer });
    }
    if (!aditional) return;
    handleTotalPay();
  }, [aditional, planPackages]);

  return (
    <div
      className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-90 overflow-y-auto max-h-screen 
        lg:w-[75%]">
      <form onSubmit={onSubmit}>
        <div className="md:flex gap-8 items-center">
          {/*COL-1*/}
          <div id="col-1 ">
            {/*FULL NAME */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                value={formData.nombreCompleto}
                onChange={handleInput}
                type="text"
                name="nombreCompleto"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Nombre completo"
              />
            </div>
            {/* DOCUMENT TYPE */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formData.documentoTipo}
                onChange={handleInput}
                name="documentoTipo"
                id="documentoTipo"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected>
                  TIPO DE DOCUMENTO
                </option>
                {Object.values(DOCUMENT_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            {/* DOCUMENT NUMBER */}
            <div className="relative mb-3">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentTextOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary " />
              <input
                value={formData.numeroDocumento}
                onChange={handleInput}
                type="number"
                name="numeroDocumento"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Numero de documento"
              />
            </div>
            {/* PHONE NUMBER */}
            <div className="relative mb-3">
              <span className="absolute mt-1 text-red-600">*</span>
              <HiOutlinePhoneArrowDownLeft className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                value={formData.telefonoContacto}
                onChange={handleInput}
                type="number"
                name="telefonoContacto"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Telefono de contacto"
              />
            </div>
            {/* PHONE REFERENCE NUMBER */}
            <div className="relative mb-3">
              <HiOutlinePhoneArrowDownLeft className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                value={formData.telefonoReferencia}
                onChange={handleInput}
                type="number"
                name="telefonoReferencia"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Telefono de referencia"
              />
            </div>
            {/* EMAIL */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <HiOutlineMail className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                value={formData.email}
                onChange={handleInput}
                type="text"
                name="email"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Correo electronico"
              />
            </div>
          </div>
          {/*COL-2*/}
          <div id="col-2">
            {/* DEPARTAMENT */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formData.departamento}
                onChange={(e) => {
                  handleDeparament(e), handleInput(e);
                }}
                name="departamento"
                id="departamento"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccionar" selected>
                  SELECCIONAR DEPARTAMENTO
                </option>
                {departaments.map((departament) => (
                  <option value={departament}>{departament}</option>
                ))}
              </select>
            </div>
            {/* PROVINCIE */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formData.provincia}
                onChange={(e) => {
                  handleProvincie(e), handleInput(e);
                }}
                name="provincia"
                id="provincia"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccionar" selected>
                  SELECCIONAR PROVINCIA
                </option>

                {formData.departamento &&
                  provincies[formData.departamento].map((provincie) => (
                    <option value={provincie}>{provincie}</option>
                  ))}
              </select>
            </div>
            {/* DISTRICT */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formData.distrito}
                onChange={(e) => {
                  handleInput(e), handleDistrict(e);
                }}
                name="distrito"
                id="distrito"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccionar" selected>
                  SELECCIONAR DISTRITO
                </option>

                {formData.provincia &&
                  districts[formData.provincia].map((district) => (
                    <option value={district}>{district}</option>
                  ))}
              </select>
            </div>
            {/* SELLER */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formData.vendedor}
                onChange={handleInput}
                name="vendedor"
                disabled={isAdmin(user)}
                className={`py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary `}>
                <option value={formData.vendedor}>{formData.vendedor}</option>
                {empleados.map((emp) => (
                  <option value={emp.username}> {emp.username}</option>
                ))}
              </select>
            </div>
            {/* TYPE OF SERVICE */}
            <div className="relative mb-5">
              <span className="absolute mt-1 text-red-600">*</span>
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formData.servicioTipo}
                onChange={handleInput}
                name="servicioTipo"
                id="servicioTipo"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected>
                  SELECCIONAR TIPO DE SERVICIO
                </option>
                <option value="AAHH">AAHH</option>
                <option value="CONDOMINIO">CONDOMINIO</option>
                <option value="RESIDENCIA">RESIDENCIA</option>
                <option value="RURAL">RURAL</option>
              </select>
            </div>
            {/* PREDIO */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <BiBuildingHouse className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formData.predio}
                onChange={handleInput}
                name="predio"
                id="predio"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected>
                  SELECCIONAR PREDIO
                </option>
                {Object.values(PREDIOS).map((predio) => (
                  <option key={predio} value={predio}>
                    {predio}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/*COL-3*/}
          <div id="col-3" className="flex flex-col">
            {/* RESULT */}
            {editMode &&
              (user?.rol === ROL.ADMIN || user?.rol === ROL.SUPERVISOR) && (
                <div className="relative mb-4">
                  <span className="absolute mt-1 text-red-600">*</span>
                  <BsCartPlus className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                  <select
                    value={formData.result}
                    onChange={handleInput}
                    name="result"
                    className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                    <option value="seleccion" selected disabled>
                      SELECCIONAR RESULTADO
                    </option>
                    {RESULTS.map((result, index) => (
                      <option value={result} key={index}>
                        {result}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            {/* COORDINATES */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoLocationOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                value={formData.coordenadas}
                onChange={handleInput}
                type="text"
                name="coordenadas"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Coordenadas"
              />
            </div>
            {/* ADITIONAL */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <BsCartPlus className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formData.aditional.id}
                onChange={(e) => {
                  handleAditional(e);
                }}
                name="aditional"
                id="aditional"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion">SELECCIONAR ADICIONAL</option>
                {PLANS_ADITIONAL.map((plan) => (
                  <option value={plan.id} id={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            {/* PLAN */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <FaSignal className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formData.plan.id}
                onChange={(e) => {
                  handlePlanPackages(e);
                }}
                name="plan"
                id="plan"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion">SELECCIONAR PAQUETE</option>
                {PLANS_PACKAGES.map((plan) => (
                  <option
                    id={plan.megas}
                    value={
                      plan.id
                    }>{`${plan.megas} ${plan.velocity} - ${plan.currency}/${plan.price}`}</option>
                ))}
              </select>
            </div>
            {/* MESH */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <HiSignal className="absolute top-1/2 -translate-y-1/2 left-2 text-primary " />
              <input
                value={formData.mesh}
                onChange={handleInput}
                type="number"
                name="mesh"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Cantidad de mesh"
              />
            </div>
            {/* FULL PAYMENT */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <BsCashStack className="absolute top-1/2 -translate-y-1/2 left-2 text-primary " />
              <input
                value={formData.totalPayment}
                type="number"
                name="pagoTotal"
                disabled
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
              />
            </div>
            {/* INPUT IMAGES */}
            {!editMode && (
              <div className="relative mb-4 ">
                <span className="absolute mt-1 ml-2 text-red-600">*</span>
                <BsImages className="absolute top-1/2 -translate-y-1/2 left-2 text-primary " />
                <input
                  onChange={handleInputFile}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary appearance-none"
                  name="image"
                  id="image"
                />
              </div>
            )}
          </div>
          {/*COL-4*/}
          <div id="col-4">
            {/* OPERATOR /*/}
            <div className="relative mb-3">
              <span className="absolute mt-1 text-red-600">*</span>
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formData.operador}
                onChange={handleInput}
                name="operador"
                id="operador"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected>
                  OPERADOR
                </option>
                {Object.entries(SERVICE_OPERATORS).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            {/* COMMISSION */}
            <div className="relative mb-3">
              <BsCashStack className="absolute top-1/2 -translate-y-1/2 left-2 text-primary " />
              <input
                value={formData.comision}
                onChange={handleInput}
                type="number"
                name="comision"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="comision"
              />
            </div>
            {/* ADDRESS */}
            <div className="relative mb-3">
              <span className="absolute mt-1 ml-2 text-red-600">*</span>
              <textarea
                value={formData.direccion}
                onChange={handleInput}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                name="direccion"
                id="direccion"
                cols="30"
                rows="9"
                placeholder="Direccion del cliente..."></textarea>
            </div>
          </div>
        </div>
        <div id="row-2" className="flex gap-4 justify-center w-full">
          {/* ESTATE*/}
          {editMode &&
            (user?.rol === ROL.ADMIN || user?.rol === ROL.SUPERVISOR) && (
              <div className="relative mb-2 w-full">
                <textarea
                  value={formData.estado}
                  onChange={handleInput}
                  type="text"
                  name="estado"
                  cols="30"
                  rows="3"
                  className="py-2 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                  placeholder="Estado de la venta"
                />
              </div>
            )}
          {/* OBSERVATION */}
          <div className="relative w-full">
            <textarea
              value={formData.observacion}
              onChange={handleInput}
              className="py-2 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
              name="observacion"
              id="observacion"
              cols="30"
              rows="3"
              placeholder="Observaciones del cliente..."></textarea>
          </div>
        </div>
        <hr className="my-4 border-gray-500/30" />
        {/*BUTTONS*/}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-primary text-black w-auto md:w-1/4 uppercase font-bold text-sm  py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
            {editMode ? "Actualizar" : "Ingresar"}
          </button>

          {editMode && (
            <button
              onClick={handleModalForm}
              className="bg-primary text-black uppercase font-bold text-sm  py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors w-auto md:w-1/4">
              Cancelar
            </button>
          )}

          {btnCancel && (
            <button
              onClick={handleModalForm}
              className="bg-primary text-black uppercase font-bold text-sm  py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors w-auto md:w-1/4">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <Modal
        open={isOpenModalFormSale}
        handleModalFormSale={handleModalFormSale}
        className="flex items-center p-8 md:h-full justify-center">
        {statusFormSale.status ? (
          <ModalSaleCompleted
            handleModalFormSale={handleModalFormSale}
            statusForm={statusFormSale}
            setStatusFormSale={setStatusFormSale}
          />
        ) : (
          <ModalFormSale
            handleModalFormSale={handleModalFormSale}
            statusForm={statusFormSale}
            setStatusFormSale={setStatusFormSale}
          />
        )}
      </Modal>

      <Modal
        open={isOpenModalUpdatedSale}
        onClose={handleModalUpdatedSale}
        style={styleModal}>
        <ModalUpdatedSale
          statusUpdatedSale={statusUpdatedSale}
          setStatusUpdated={setStatusUpdated}
          handleModal={handleModalForm}
          handleModalEdit={handleModalForm}
        />
      </Modal>
    </div>
  );
};

export default FormSale;
