import React from "react";
import FormInput from "./FormInput .jsx";
import FormLabel from "./FormLabel.jsx";
import { RENOVATION_TYPES } from "../../helper/streamingServices.js";
import { TiDeleteOutline } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";

const UserStreamingForm = ({ index, profile, removeProfile }) => {
  return (
    <div key={profile?._id} className="flex gap-4 text-center">
      <div className="">
        <FormLabel htmlFor={`vecimiento_${index}`}>vecimiento</FormLabel>
        <FormInput
          type="date"
          name={`vecimiento_${index}`}
          defaultValue={profile?.vencimiento}
        />
      </div>
      <div className="">
        <FormLabel htmlFor={`numero_${index}`}>numero</FormLabel>
        <FormInput
          type="number"
          defaultValue={profile?.numero}
          name={`numero_${index}`}
        />
      </div>
      <div className="">
        <FormLabel htmlFor={`perfil_${index}`}>perfil</FormLabel>
        <FormInput
          type="text"
          defaultValue={profile?.perfil}
          name={`perfil_${index}`}
        />
      </div>
      <div className="">
        <FormLabel htmlFor={`pin_${index}`}>pin</FormLabel>
        <FormInput
          type="number"
          defaultValue={profile?.pin}
          name={`pin_${index}`}
        />
      </div>
      <div className="">
        <FormLabel htmlFor={`pecio_${index}`}>precio</FormLabel>
        <FormInput
          type="number"
          defaultValue={profile?.precio}
          name={`precio_${index}`}
        />
      </div>

      <div>
        <FormLabel htmlFor={`renovacion_${index}`}>renovacion</FormLabel>
        <select
          defaultValue={profile?.renovacion}
          name={`renovacion_${index}`}
          id="resultado"
          className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
          <option value="seleccion" selected>
            SELECCIONAR RENOVACION
          </option>
          {RENOVATION_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {profile && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              removeProfile(profile);
            }}
            type="button"
            className="text-black rounded-full
            ">
            <TiDelete className="text-4xl text-primary mt-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserStreamingForm;
