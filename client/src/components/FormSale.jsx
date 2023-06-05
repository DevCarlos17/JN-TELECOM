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

const FormSale = ({
  BtnCancel = false,
  handleModal,
  editMode,
  selectedCustomer,
  handleEdit,
  styleModal,
}) => {
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
  console.log(formData);

  const { isOpenModalUpdatedSale, handleModalUpdatedSale, setStatusUpdated } =
    useModalUpdatedSale();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await editSale();
      handleModalUpdatedSale();
    } else {
      await createSale(e);
      handleModalFormSale(), handleModal && handleModal();
    }
  };

  const { isOpenModalFormSale, handleModalFormSale } = useModalFormSale();

  useEffect(() => {
    if (editMode) {
      setFormData({ ...formData, ...selectedCustomer });
    }
    if (!aditional) return;
    handleTotalPay();
  }, [aditional, planPackages]);

  return (
    <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-90 lg:w-[75%] overflow-y-auto max-h-screen">
      <form onSubmit={onSubmit}>
        <div className=" md:flex gap-8 items-center mb-4">
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
                  SELECCIONAR TIPO DOCUMENTO
                </option>
                <option value="CE">C.E</option>
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
              </select>
            </div>
            {/* DOCUMENT NUMBER */}
            <div className="relative mb-4">
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
            <div className="relative mb-4">
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
            <div className="relative mb-4">
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
            <span className="absolute mt-1 text-red-600">*</span>
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
              <input
                value={formData.vendedor}
                type="text"
                name="vendedor"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                disabled
              />
            </div>
            {/* TYPE OF SERVICE */}
            <div className="relative mb-4">
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
                <option value="CASA">CASA</option>
                <option value="EDIFICIO">EDIFICIO</option>
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
                type="text"
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
            {/* SALES STATE */}
            {editMode &&
              (user?.rol === ROL.ADMIN || user?.rol === ROL.SUPERVISOR) && (
                <div className="relative mb-4">
                  <textarea
                    value={formData.estado}
                    onChange={handleInput}
                    type="text"
                    name="estado"
                    cols="30"
                    rows="4"
                    className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                    placeholder="Estado de la venta"
                  />
                </div>
              )}

            {/* ADDRESS */}
            <div className="relative mb-4">
              <span className="absolute mt-1 ml-2 text-red-600">*</span>
              <textarea
                value={formData.direccion}
                onChange={handleInput}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                name="direccion"
                id="direccion"
                cols="30"
                rows="3"
                placeholder="Direccion del cliente..."></textarea>
            </div>
            {/* OBSERVACION */}
            <div className="relative mb-4">
              <textarea
                value={formData.observacion}
                onChange={handleInput}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                name="observacion"
                id="observacion"
                cols="30"
                rows={
                  (user?.rol === ROL.ADMIN || user?.rol === ROL.SUPERVISOR) &&
                  "3"
                }
                placeholder="Observaciones del cliente..."></textarea>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-500/30" />
        {/*BUTTONS*/}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-primary text-black w-auto md:w-1/4 uppercase font-bold text-sm  py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
            {editMode ? "Actualizar" : "Ingresar"}
          </button>

          {editMode && (
            <button
              onClick={handleEdit}
              className="bg-primary text-black uppercase font-bold text-sm  py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors w-auto md:w-1/4">
              Cancelar
            </button>
          )}
          {BtnCancel && (
            <button
              onClick={() => handleModal()}
              className="bg-primary text-black uppercase font-bold text-sm w-auto md:w-1/4 py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
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
          handleModal={handleModalUpdatedSale}
          handleModalEdit={handleEdit}
        />
      </Modal>
    </div>
  );
};

export default FormSale;
