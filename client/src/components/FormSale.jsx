import React, { useEffect, useState } from "react";
import useFormData from "../hooks/useFormData.jsx";
import { useUserContext } from "../context/userContext.jsx";

//ICONS
import { BiBuildingHouse } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlinePhoneArrowDownLeft, HiSignal } from "react-icons/hi2";
import { IoDocumentTextOutline, IoDocumentsOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { BsCashStack, BsCartPlus, BsImages } from "react-icons/bs";
import { FaSignal } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

//MODALS
import { Modal } from "@mui/material";
import ModalFormSale from "./ModalFormSale.jsx";
import ModalSaleCompleted from "./ModalSaleCompleted.jsx";
import useModalFormSale from "../hooks/useModalFormSale.jsx";

const FormSale = ({ BtnCancel = false, handleModal }) => {
  const {
    user,
    handleInput,
    handleInputFile,
    onSubmit,
    statusFormSale,
    setStatusFormSale,
    handleAditional,
    handlePlanPackages,
    handleTotalPay,
    handleDeparament,
    handleProvincie,
    planPackages,
    aditional,
    fullPayment,
    provincieInput,
    districtInput,
    departaments,
    PLANS_PACKAGES,
    PLANS_ADITIONAL,
  } = useFormData();

  const { isOpenModalFormSale, handleModalFormSale } = useModalFormSale();

  useEffect(() => {
    if (!aditional) return;
    handleTotalPay();
  }, [aditional, planPackages]);

  return (
    <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-90 lg:w-[75%]">
      <form
        onSubmit={(e) => {
          onSubmit(e), handleModalFormSale(), handleModal && handleModal();
        }}>
        <div className=" md:flex gap-8 items-center mb-4">
          <div id="col-1 ">
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                onChange={handleInput}
                type="text"
                name="nombreCompleto"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Nombre completo"
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={handleInput}
                name="documentoTipo"
                id="documentoTipo"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected disabled>
                  SELECCIONAR TIPO DOCUMENTO
                </option>
                <option value="CE">C.E</option>
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
              </select>
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentTextOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary " />
              <input
                onChange={handleInput}
                type="number"
                name="numeroDocumento"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Numero de documento"
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <HiOutlinePhoneArrowDownLeft className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                onChange={handleInput}
                type="number"
                name="telefonoContacto"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Telefono de contacto"
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <HiOutlinePhoneArrowDownLeft className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                onChange={handleInput}
                type="number"
                name="telefonoReferencia"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Telefono de referencia"
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <HiOutlineMail className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                onChange={handleInput}
                type="text"
                name="email"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Correo electronico"
              />
            </div>
          </div>
          <div id="col-2">
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={(e) => {
                  handleDeparament(e), handleInput(e);
                }}
                name="departamento"
                id="departamento"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-min outline-none rounded-lg focus:border border-primary">
                <option value="seleccionar" selected disabled>
                  SELECCIONAR DEPARTAMENTO
                </option>
                {departaments.map((departament) => (
                  <option value={departament}>{departament}</option>
                ))}
              </select>
            </div>
            <span className="absolute mt-1 text-red-600">*</span>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={(e) => {
                  handleProvincie(e), handleInput(e);
                }}
                name="provincia"
                id="provincia"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccionar" selected disabled>
                  SELECCIONAR PROVINCIA
                </option>

                {provincieInput &&
                  provincieInput.map((provincie) => (
                    <option value={provincie}>{provincie}</option>
                  ))}
              </select>
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={handleInput}
                name="distrito"
                id="distrito"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccionar" selected disabled>
                  SELECCIONAR DISTRITO
                </option>

                {districtInput &&
                  districtInput.map((district) => (
                    <option value={district}>{district}</option>
                  ))}
              </select>
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                defaultValue={user?.username}
                type="text"
                name="vendedor"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                disabled
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={handleInput}
                name="servicioTipo"
                id="servicioTipo"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected disabled>
                  SELECCIONAR TIPO DE SERVICIO
                </option>
                <option value="AAHH">AAHH</option>
                <option value="CONDOMINIO">CONDOMINIO</option>
                <option value="RESIDENCIA">RESIDENCIA</option>
                <option value="RURAL">RURAL</option>
              </select>
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <BiBuildingHouse className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={handleInput}
                name="predio"
                id="predio"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected disabled>
                  SELECCIONAR PREDIO
                </option>
                <option value="CASA">CASA</option>
                <option value="EDIFICIO">EDIFICIO</option>
              </select>
            </div>
          </div>
          <div id="col-3" className="flex flex-col">
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoLocationOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                onChange={handleInput}
                type="text"
                name="coordenadas"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Coordenadas"
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <BsCartPlus className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={(e) => {
                  handleAditional(e);
                }}
                name="aditional"
                id="aditional"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected disabled>
                  SELECCIONAR ADICIONAL
                </option>
                {PLANS_ADITIONAL.map((plan) => (
                  <option value={plan.id} id={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <FaSignal className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={(e) => {
                  handlePlanPackages(e);
                }}
                name="plan"
                id="plan"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected disabled>
                  SELECCIONAR PAQUETE
                </option>
                {PLANS_PACKAGES.map((plan) => (
                  <option
                    id={plan.megas}
                    value={
                      plan.id
                    }>{`${plan.megas} ${plan.velocity} - ${plan.currency}/${plan.price}`}</option>
                ))}
              </select>
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <HiSignal className="absolute top-1/2 -translate-y-1/2 left-2 text-primary " />
              <input
                onChange={handleInput}
                type="number"
                name="mesh"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Cantidad de mesh"
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <BsCashStack className="absolute top-1/2 -translate-y-1/2 left-2 text-primary " />
              <input
                value={fullPayment}
                type="text"
                name="pagoTotal"
                disabled
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
              />
            </div>
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
          </div>
          <div id="col-4">
            <div className="relative mb-4">
              <span className="absolute mt-1 ml-2 text-red-600">*</span>
              <textarea
                onChange={handleInput}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                name="direccion"
                id="direccion"
                cols="30"
                rows="6"
                placeholder="Direccion del cliente..."></textarea>
            </div>
            <div className="relative mb-4">
              <textarea
                onChange={handleInput}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                name="observacion"
                id="observacion"
                cols="30"
                rows="6"
                placeholder="Observaciones del cliente..."></textarea>
            </div>
          </div>
        </div>
        <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-primary text-black uppercase font-bold text-sm w-1/4 py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
            INGRESAR
          </button>
          {BtnCancel && (
            <button
              onClick={() => handleModal()}
              className="bg-primary text-black uppercase font-bold text-sm w-1/4 py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
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
    </div>
  );
};

export default FormSale;
