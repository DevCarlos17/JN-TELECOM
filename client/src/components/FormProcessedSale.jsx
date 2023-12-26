import React, { useEffect } from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { IoDocumentsOutline } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import useFormProcessedSale from "../hooks/useFormProcessedSale.jsx";
import useSupervisors from "../hooks/useSupervisors.jsx";
import { useVerticalGrowthContext } from "../context/verticalGrowthContext.jsx";
import { PROCESSED_SALE_RESULTS } from "../helper/FormData.js";
import { toaster } from "../helper/utils.js";

const FormProcessedSale = ({
  editMode = false,
  selectedSale,
  handleModalForm,
}) => {
  const { supervisors } = useSupervisors();
  const { formProcessedSale, handleFormProcessedSale, setFormProcessedSale } =
    useFormProcessedSale();
  const { postProcessedSale, putProcessedSale } = useVerticalGrowthContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!editMode) {
      toaster(postProcessedSale(formProcessedSale));
      return handleModalForm();
    } else {
      toaster(putProcessedSale(formProcessedSale));
      return handleModalForm();
    }
  };

  useEffect(() => {
    if (editMode) {
      setFormProcessedSale(selectedSale);
    }
  }, []);

  return (
    <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-90 overflow-y-auto max-h-screen">
      <form onSubmit={onSubmit}>
        <div className="flex gap-4 items-center mb-4">
          {/*COL-1*/}
          <div id="col-1 ">
            {/* PREDIO */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <BiBuildingHouse className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formProcessedSale.predio}
                onChange={handleFormProcessedSale}
                name="predio"
                id="predio"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected>
                  SELECCIONAR PREDIO
                </option>
                <option value="CONDOMINIO">CONDOMINIO</option>
                <option value="EDIFICIO">EDIFICIO</option>
              </select>
            </div>
            {/* PREDIO NAME */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <BiBuildingHouse className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                value={formProcessedSale.nombrePredio}
                onChange={handleFormProcessedSale}
                type="text"
                name="nombrePredio"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Nombre del predio"
              />
            </div>

            {/*  SUPERVISOR */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formProcessedSale.supervisor}
                onChange={handleFormProcessedSale}
                name="supervisor"
                id="supervisor"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion">SELECCIONAR SUPERVISOR</option>
                {supervisors &&
                  supervisors.map((supervisor) => (
                    <option
                      key={supervisor.username}
                      value={supervisor.username}>
                      {supervisor.username}
                    </option>
                  ))}
              </select>
            </div>
            {/* SALES STATE */}
            <div className="relative mb-4">
              <textarea
                value={formProcessedSale.estado}
                onChange={handleFormProcessedSale}
                type="text"
                name="estado"
                cols="30"
                rows="6"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="Estado de la venta"
              />
            </div>
          </div>

          {/*COL-2*/}
          <div id="col-2">
            {/* DISTRICT */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <IoDocumentsOutline className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                type="text"
                placeholder="DISTRITO"
                value={formProcessedSale.distrito}
                onChange={handleFormProcessedSale}
                name="distrito"
                id="distrito"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"></input>
            </div>
            {/*  PRESIDENT */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                value={formProcessedSale.presidente}
                onChange={handleFormProcessedSale}
                type="text"
                name="presidente"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="PRESIDENTE"
              />
            </div>
            {/*  ADMINISTRADOR */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                value={formProcessedSale.administrador}
                onChange={handleFormProcessedSale}
                type="text"
                name="administrador"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="ADMINISTRADOR"
              />
            </div>
            {/* RESULT */}
            <div className="relative mb-4">
              <span className="absolute mt-1 text-red-600">*</span>
              <BiBuildingHouse className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <select
                value={formProcessedSale.resultado}
                onChange={handleFormProcessedSale}
                name="resultado"
                id="resultado"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                <option value="seleccion" selected>
                  SELECCIONAR RESULTADO
                </option>
                {PROCESSED_SALE_RESULTS.map((result) => (
                  <option key={result} value={result}>
                    {result}
                  </option>
                ))}
              </select>
            </div>
            {/* ADDRESS */}
            <div className="relative mb-4">
              <span className="absolute mt-1 ml-2 text-red-600">*</span>
              <textarea
                value={formProcessedSale.direccion}
                onChange={handleFormProcessedSale}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                name="direccion"
                id="direccion"
                cols="30"
                rows="3"
                placeholder="Direccion del cliente..."></textarea>
            </div>
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

          <button
            onClick={handleModalForm}
            className="bg-primary text-black uppercase font-bold text-sm w-auto md:w-1/4 py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProcessedSale;
