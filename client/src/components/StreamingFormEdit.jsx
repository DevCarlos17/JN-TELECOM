import React from "react";
import LeftColumnCell from "./streamingForm/LeftColumnCell.jsx";
import HeaderCell from "./streamingForm/HeaderCell.jsx";

const StreamingFormEdit = ({ data }) => {
  const usuarios = [
    {
      vencimiento: new Date(),
      numero: "0114658",
      perfil: "carlosM",
      pin: "0204",
      precio: "30",
      renovacion: "Si",
    },
    {
      vencimiento: new Date(),
      numero: "0114658",
      perfil: "carlosM",
      pin: "0204",
      precio: "30",
      renovacion: "Si",
    },
    {
      vencimiento: new Date(),
      numero: "0114658",
      perfil: "carlosM",
      pin: "0204",
      precio: "30",
      renovacion: "Si",
    },
    {
      vencimiento: new Date(),
      numero: "0114658",
      perfil: "carlosM",
      pin: "0204",
      precio: "30",
      renovacion: "Si",
    },
    {
      vencimiento: new Date(),
      numero: "0114658",
      perfil: "carlosM",
      pin: "0204",
      precio: "30",
      renovacion: "Si",
    },
  ];

  const formatDate = (dateString) => {
    const formattedDate = dateString.toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <div className="grid grid-cols-9  h-auto bg-secondary-100 w-[75vw]">
      {/* COL 1*/}
      <div className="grid col-span-1 p-4 items-center">
        <LeftColumnCell title="plataforma" subtitle={data?.plataforma} />
        <LeftColumnCell title="correo" subtitle={data?.correo} />
        <LeftColumnCell title="contraseña" subtitle={data?.contraseña} />
      </div>
      {/* COL 2*/}
      <div className="col-span-8 p-2  grid grid-col-8 grid-rows-2 gap-4 ">
        {/*HEADER*/}
        <div className="grid grid-cols-8">
          <HeaderCell title={"vencimiento"} />
          <HeaderCell title={"numero"} />
          <HeaderCell title={"perfil"} />
          <HeaderCell title={"pin"} />
          <HeaderCell title={"precio"} />
          <HeaderCell title={"renovacion"} />
          <HeaderCell title={"boton 1"} />
          <HeaderCell title={"boton 2"} />
        </div>
        {/*ROWS */}

        {/*usuarios?.map((user) => {
          return (
            <div className="grid grid-cols-8">
              <FormInput
                type={"date"}
                name={"vencimiento"}
                value={formatDate(user.vencimiento)}
              />
              <FormInput type={"text"} name={"numero"} value={user?.numero} />
              <FormInput type={"text"} name={"perfil"} value={user?.perfil} />
              <FormInput type={"text"} name={"pin"} value={user?.pin} />
              <FormInput type={"text"} name={"precio"} value={user?.precio} />
              <FormInput
                type={"text"}
                name={"renovacion"}
                value={user?.renovacion}
              />
              <OrangeButton text={"entrega"} size={"w-28"} />
              <OrangeButton text={"vencido"} size={"w-28"} />
            </div>
          );
        })*/}
      </div>
    </div>
  );
};

export default StreamingFormEdit;
