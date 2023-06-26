import React from "react";
import { HiOutlinePhoneArrowDownLeft } from "react-icons/hi2";
import useFormFinancial from "../hooks/useFormFinancial.jsx";
import { useFinancialRecordContext } from "../context/FinancialRecordsContext.jsx";

const FormFinancialRecord = ({ handleModal }) => {
  const { formFinancial, handleInput } = useFormFinancial();
  const { postFinancialRecord } = useFinancialRecordContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    await postFinancialRecord(formFinancial);
    handleModal();
  };

  return (
    <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-90 overflow-y-auto max-h-screen">
      <form onSubmit={onSubmit}>
        <div className="flex gap-4 items-center mb-4">
          {/*COL-1*/}
          <div id="col-1 ">
            {/* INCOME*/}
            <div className="relative mb-4">
              <HiOutlinePhoneArrowDownLeft className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                value={formFinancial.ingreso}
                onChange={handleInput}
                type="number"
                name="ingreso"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="INGRESO"
              />
            </div>
            {/* EXPRENSE*/}
            <div className="relative mb-4">
              <HiOutlinePhoneArrowDownLeft className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                value={formFinancial.gasto}
                onChange={handleInput}
                type="number"
                name="gasto"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                placeholder="GASTO"
              />
            </div>
            {/* REASON */}
            <div className="relative mb-4">
              <textarea
                value={formFinancial.motivo}
                onChange={handleInput}
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary"
                name="motivo"
                id="motivo"
                cols="30"
                rows="4"
                placeholder="Motivo del gasto"
              />
            </div>
            <hr className="my-8 border-gray-500/30" />
            {/*BUTTONS*/}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-primary text-black w-auto  uppercase font-bold text-sm  py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
                Ingresar
              </button>

              <button
                onClick={handleModal}
                className="bg-primary text-black uppercase font-bold text-sm w-auto py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormFinancialRecord;
