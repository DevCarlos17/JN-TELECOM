import { STREAMING_SERVICES } from "../../helper/streamingServices.js";
import useStreamingAcc from "../../hooks/useStreamingAcc.jsx";
import useStreamingForm from "../../hooks/useStreamingForm.jsx";
import OrangeButton from "../OrangeButton.jsx";
import FormInput from "./FormInput .jsx";
import FormLabel from "./FormLabel.jsx";
import UserStreamingForm from "./UserStreamingForm.jsx";

const StreamingForm = ({ editMode, selectedCustomer, handleModal }) => {
  const { onSubmit, onUpdate } = useStreamingForm();

  const { profiles, addProfile, removeLastProfile, removeProfile } =
    useStreamingAcc({
      initialProfiles: selectedCustomer?.perfiles || [{}],
    });

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await onUpdate({ e, _id: selectedCustomer._id });
      handleModal();
    } else {
      await onSubmit(e);
      handleModal();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-[-70px]">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto ">
        <h1 className="text-2xl text-center uppercase font-bold tracking-[5px] text-primary mb-16">
          {editMode && "Editar"}
          {!editMode && "Registrar"}
          <span className="text-white"> cuenta</span>
        </h1>
        <form onSubmit={handleSumbit} className="mb-8">
          {/*NO EDIT MODE*/}
          {!editMode && (
            <div className="flex w-[75vw] bg-secondary-100">
              {/* COL 1*/}
              <div className="flex flex-col p-4 gap-3 w-[22vw] justify-center">
                <div>
                  <FormLabel htmlFor="Plataforma">plataforma</FormLabel>
                  <select
                    defaultValue={selectedCustomer?.plataforma}
                    name="plataforma"
                    id="plataforma"
                    className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                    <option value="seleccion" selected>
                      SELECCIONAR PLATAFORMA
                    </option>
                    {STREAMING_SERVICES.map(({ name, id }) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FormLabel htmlFor="correo">correo</FormLabel>
                  <FormInput
                    type="email"
                    name="correo"
                    placeholder="correo"
                    id="correo"
                  />
                </div>

                <div>
                  <FormLabel htmlFor="contraseña">contraseña</FormLabel>
                  <FormInput
                    id="contraseña"
                    type="text"
                    name="contraseña"
                    placeholder="contraseña"
                  />
                </div>
              </div>
              {/* COL 2*/}

              <div className="flex flex-col gap-y-4">
                {profiles?.map((user, index) => (
                  <UserStreamingForm
                    key={user?.numero}
                    index={index}
                    removeProfile={removeProfile}
                  />
                ))}
              </div>
            </div>
          )}

          {/*EDIT MODE*/}
          {editMode && (
            <div className="flex w-[75vw] bg-secondary-100">
              {/* COL 1*/}
              <div className="flex flex-col p-4 gap-3 w-[18vw] justify-center">
                <div>
                  <FormLabel htmlFor="Plataforma">plataforma</FormLabel>
                  <select
                    defaultValue={selectedCustomer?.plataforma}
                    name="plataforma"
                    id="plataforma"
                    className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg focus:border border-primary">
                    <option value="seleccion" selected>
                      SELECCIONAR PLATAFORMA
                    </option>
                    {STREAMING_SERVICES.map(({ name, id }) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FormLabel htmlFor="correo">correo</FormLabel>
                  <FormInput
                    type="email"
                    name="correo"
                    placeholder="correo"
                    id="correo"
                    defaultValue={selectedCustomer?.correo}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="contraseña">contraseña</FormLabel>
                  <FormInput
                    id="contraseña"
                    type="text"
                    name="contraseña"
                    placeholder="contraseña"
                    defaultValue={selectedCustomer?.contraseña}
                  />
                </div>
              </div>
              {/* COL 2*/}
              <div className="flex flex-col gap-y-4">
                {profiles.map((profile, index) => (
                  <UserStreamingForm
                    removeProfile={removeProfile}
                    key={profile?._id}
                    index={index}
                    profile={profile}
                  />
                ))}
              </div>
            </div>
          )}

          <hr className="my-4 border-gray-500/30" />
          {/*BUTTONS*/}
          <div className="text-center flex justify-center ">
            {editMode && (
              <div className="flex justify-center gap-x-2 w-[25vw] ">
                <OrangeButton type="submit" text="actualizar" size="w-[20vw]">
                  Actualizar
                </OrangeButton>
                <OrangeButton
                  onClick={addProfile}
                  type="button"
                  size="w-[20vw]">
                  Agregar Perfil
                </OrangeButton>
              </div>
            )}

            {!editMode && (
              <div className="flex flex-col justify-center gap-y-5 w-[50vw] items-center mt-5">
                <div className="w-[30vw]">
                  <button
                    type="submit"
                    className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors">
                    Registrar
                  </button>
                </div>
                <div className="flex gap-x-4 w-[30vw]">
                  <OrangeButton
                    onClick={addProfile}
                    type="button"
                    size="w-full">
                    Agregar Perfil
                  </OrangeButton>
                  <OrangeButton
                    onClick={removeLastProfile}
                    type="button"
                    size="w-full">
                    ELiminar perfil
                  </OrangeButton>
                </div>
              </div>
            )}
          </div>

          {/*BUTTONS 2 */}
        </form>
      </div>
    </div>
  );
};

export default StreamingForm;
