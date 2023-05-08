import React, { useState } from "react";
import useFormData from "../hooks/useFormData.jsx";
import { useUserContext } from "../context/userContext.jsx";

//ICONS
import { BiBuildingHouse } from "react-icons/bi";
import { HiOutlinePhoneArrowDownLeft } from "react-icons/hi2";
import { IoDocumentTextOutline, IoDocumentsOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";

//Peru Data
import { departaments, provincies, districts } from "../helper/PeruData.js";

const FormSale = ({ BtnCancel = false, handleModal }) => {
  const [provincieInput, setPronvincieInput] = useState("");
  const [districtInput, setDistrictIput] = useState("");
  const { user } = useUserContext();

  const { handleInput, onSubmit, statusFormSale } = useFormData();

  const handleDeparament = (e) => {
    setPronvincieInput(provincies[e.target.value]);
  };

  const handleProvincie = (e) => {
    setDistrictIput(districts[e.target.value]);
  };

  return (
    <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-90 lg:w-[1100px]">
      <form
        onSubmit={(e) => {
          onSubmit(e), handleModal && handleModal();
        }}>
        <div className=" md:flex gap-8 items-center mb-4">
          <div id="col-1 ">
            <div className="relative mb-4">
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                onChange={handleInput}
                type="text"
                name="nombre"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Nombre"
              />
            </div>
            <div className="relative mb-4">
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                onChange={handleInput}
                type="text"
                name="apellido"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Apellido"
              />
            </div>
            <div className="relative mb-4">
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={handleInput}
                name="documentoTipo"
                id="documentoTipo"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected>
                  SELECCIONAR TIPO DOCUMENTO
                </option>
                <option value="CarnetExtranjeria">CARNET DE EXTRANJERIA</option>
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
              </select>
            </div>
            <div className="relative mb-4">
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
              <HiOutlinePhoneArrowDownLeft className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                onChange={handleInput}
                type="number"
                name="telefonoReferencia"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Telefono de referencia"
              />
            </div>
          </div>
          <div id="col-2">
            <div className="relative mb-4">
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={(e) => {
                  handleDeparament(e), handleInput(e);
                }}
                name="departamento"
                id="departamento"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                {departaments.map((departament) => (
                  <option value={departament}>{departament}</option>
                ))}
              </select>
            </div>
            <div className="relative mb-4">
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={(e) => {
                  handleProvincie(e), handleInput(e);
                }}
                name="provincia"
                id="provincia"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccionar" selected>
                  SELECCIONAR PROVINCIA
                </option>

                {provincieInput &&
                  provincieInput.map((provincie) => (
                    <option value={provincie}>{provincie}</option>
                  ))}
              </select>
            </div>
            <div className="relative mb-4">
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={handleInput}
                name="distrito"
                id="distrito"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccionar">SELECCIONAR DISTRITO</option>

                {districtInput &&
                  districtInput.map((district) => (
                    <option value={district}>{district}</option>
                  ))}
              </select>
            </div>
            <div className="relative mb-4">
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
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
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
            <div className="relative mb-4">
              <BiBuildingHouse className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                onChange={handleInput}
                name="casaTipo"
                id="casaTipo"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected>
                  SELECCIONAR TIPO DE CASA
                </option>
                <option value="CASA">CASA</option>
                <option value="APARTAMENTO">APARTAMENTO</option>
              </select>
            </div>
          </div>
          <div id="col-3">
            <div className="relative mb-4">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                multiple
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                name="image_uploads"
                id="image_uploads"></input>
            </div>

            <div className="relative mb-4">
              <textarea
                onChange={handleInput}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                name="direccion"
                id="direccion"
                cols="30"
                rows="5"
                placeholder="Direccion del cliente..."></textarea>
            </div>
            <div className="relative mb-4">
              <textarea
                onChange={handleInput}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                name="observacion"
                id="observacion"
                cols="30"
                rows="4"
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
        <div className="flex flex-col pt-2">
          <span className="text-primary text-center">{statusFormSale}</span>
        </div>
      </form>
    </div>
  );
};

export default FormSale;
