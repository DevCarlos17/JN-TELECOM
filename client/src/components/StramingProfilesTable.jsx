import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Modal } from "@mui/material";
import { useUserContext } from "../context/userContext.jsx";
import { ROL } from "../helper/Roles.js";
import { RiDeleteBin6Line } from "react-icons/ri";
import useModalContact from "../hooks/useModalContact.jsx";
import StreamingForm from "./streamingForm/StreamingForm.jsx";
import DeleteModal from "./DeleteModal.jsx";
import useStreamingForm from "../hooks/useStreamingForm.jsx";
import useModal from "../hooks/useModal.jsx";
import CopyToClipboardButton from "./CopyToClipBoardButton.jsx";

const StreamingProfilesTable = ({
  accountsData,
  profilesData,
  filterProfiles,
  resetProfiles,
}) => {
  const [editing, setEditing] = useState(false);
  const [filters, setFilters] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const { user } = useUserContext();
  const { openContactModal, handleContactModal } = useModalContact();
  const { isOpen, handleModal } = useModal();
  const { onDelete } = useStreamingForm();

  const streamingProfilesTableRef = useRef(null);

  const rowPerPages = 10;

  //Handles
  const handleEdit = () => setEditing(!editing);

  const filterStreamingPerfil = (data) => {
    const accounts = accountsData.filter(
      (account) => account.correo === data.correo
    );

    return accounts.find((account) =>
      account.perfiles.some((perfil) => perfil._id === data._id)
    );
  };
  const handleRowEdit = (event) => {
    const { originalEvent, data } = event;
    const { target } = originalEvent;
    console.log("CELDA", target.cellIndex);
    if (target.cellIndex === 3 || target.cellIndex === 0) return;
    if (user?.rol !== ROL.ADMIN) return;

    filterStreamingPerfil(data);
    setSelectedCustomer(filterStreamingPerfil(data));
    handleEdit();
  };

  //Handle Modal Delete contact
  const handleDeleteClick = ({ rowData, e }) => {
    setSelectedCustomer(rowData);
    handleModal();
  };

  //Handle Modal Edit contact
  const handleEditClick = (customerData) => {
    setSelectedCustomer(customerData);
    handleEdit();
  };
  //Handle Modal Add Contact
  const handleAddClick = () => {
    handleContactModal();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      createdAt: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      numero: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      precio: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      plataforma: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      correo: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      contraseña: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      perfil: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      pin: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      vencimiento: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      renovacion: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
    });
    setGlobalFilterValue("");
  };

  //Filter
  const clearFilter = () => {
    initFilters();
    resetProfiles();
  };

  //Headaer

  //Convert sales filtered
  const getFilteredProfiles = () => {
    const table = streamingProfilesTableRef.current.getTable();

    //Nombre de las colummnas
    const columnaHeader = Array.from(table.querySelectorAll(".p-column-title"));

    //Body de la tabla
    const bodyTable = table.querySelector(".p-datatable-tbody");
    const filas = Array.from(bodyTable.querySelectorAll('[role="row"]'));

    const sales = [];
    //Fila
    for (let i = 0; i < filas.length; i++) {
      //Iterando cada celda de la fila
      const fila = Array.from(filas[i].children);

      //Crear objeto
      const sale = columnaHeader.reduce((acc, element, index) => {
        if (element.innerHTML !== "Editar") {
          //Verficar cuantas tiene
          acc[element.innerHTML] =
            fila[index].children.length === 0
              ? fila[index].innerHTML
              : fila[index].children[0].innerHTML;
        }

        return acc;
      }, {});

      sales.push(sale);
    }

    return sales;
  };

  //Excel's Functions
  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(getFilteredProfiles());
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "Ventas");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const renderHeader = () => {
    const inputStyles = {
      borderColor: "#ed6c02",
      boxShadow: "none",
    };

    return (
      <div className="flex justify-between gap-1">
        <div>
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Limpiar"
            severity="warning"
            everity="info"
            onClick={clearFilter}
            style={{ color: "black" }}
          />
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Busqueda rapida"
              style={inputStyles}
            />
          </span>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            label="Expirados"
            severity="danger"
            everity="info"
            rounded
            onClick={filterProfiles}
            style={{ color: "white" }}
          />

          <Button
            type="button"
            label="Agregar"
            severity="info"
            everity="info"
            rounded
            onClick={handleAddClick}
          />
          <Button
            type="button"
            icon="pi pi-file-excel"
            severity="success"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="XLS"
          />
        </div>
      </div>
    );
  };
  const header = renderHeader();

  const getSeverity = (status) => {
    switch (status) {
      case "VIGENTE":
        return "bg-lime-500";

      case "GRATIS":
        return "bg-sky-400";

      case "VENCIDO":
        return "bg-red-500";
    }
  };

  // Columns Body

  const coloredCell = ({ renovacion, value }) => {
    return (
      <div
        className={` ${getSeverity(
          renovacion
        )} rounded font-bold text-center text-gray-900 text-sm`}>
        {value}
      </div>
    );
  };

  // Date Body
  const formatDate = (value) => {
    const utcDate = new Date(value);

    return utcDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const dateBodyTemplate = ({ vencimiento }) => {
    return formatDate(vencimiento);
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const ButtonsEdit = ({ rowData }) => (
    <div className="flex gap-1 justify-center h-9">
      <button
        className="flex text-red-500 hover:bg-red-500  items-center rounded-full hover:text-white transition-colors text-[20px] w-10 justify-center"
        onClick={(e) => handleDeleteClick({ rowData, e })}>
        <RiDeleteBin6Line />
      </button>
    </div>
  );

  const btnEditBodyTemplate = (rowData) => {
    return <ButtonsEdit rowData={rowData} />;
  };
  const getPlatformWithEmoji = (platform) => {
    switch (platform) {
      case "NETFLIX":
        return `🎥🍿*${platform}*🍿🎥`;

      case "HBO MAX":
        return `🎥🍿*${platform}*🍿🎥`;

      case "DISNEY+":
        return `🎥🍿*${platform}*🍿🎥`;

      case "PRIME VIDEO":
        return `🎥🍿*${platform}*🍿🎥`;

      case "CRUNCHYROLL":
        return `🎥🍿*${platform}*🍿🎥`;

      case "PARAMOUNT+":
        return `🎥🍿*${platform}*🍿🎥`;

      case "STAR+":
        return `🎥🍿*${platform}*🍿🎥`;

      case "IPTV":
        return `⚽🥅*${platform}*🥅⚽`;
    }
  };

  const getWelcomeMessage = (data) => {
    const { plataforma, correo, contraseña, perfil, pin, vencimiento } = data;
    const [year, month, day] = vencimiento.split("T")[0].split("-");

    return `
    ${getPlatformWithEmoji(plataforma)}

  📧 Correo: ${correo} 

  🔒 Contraseña: *${contraseña}* 

  👤 Nombre de perfil: *${perfil}* 

  🔒 Pin: *${pin}* 

  ⚠️ Perderá garantía : 

  ⚠️ Intento y/o cambio de correo o contraseña.

  ⚠️ Cambio de clave o nombre del perfil.

  ⚠️ Cualquier Modificación que realice a su perfil, y otros perfiles. 

  🔥 RECUERDA Que sólo puedes ingresar en 1 sólo dispositivo a la vez (si usas más de un dispositivo se cerrará sesión automáticamente y tienes riesgo de perder el acceso a la cuenta).

  🚨 VENCE: *${day}/${month}/${year}*

  Gracias por tu compra😉
`;
  };
  const getExpirationMessage = (data) => {
    const { plataforma, perfil, precio } = data;

    return `
  Estimado(a) usuario(a).

  Se le informa que su servicio de *${plataforma}*
  Perfil: *${perfil}*

  Vence el día de hoy. Si quiere continuar su servicio, favor realizar el respectivo pago de *S/${precio}*. De antemano, gracias.

  *Métodos de pago* 
   Titular: *Mercedes Rosa Caridad*

   - *YAPE* 926699892 
   - *PLIN* 926699892  

   - *BCP* 19105099605015 
   - *BBVA* 0011-0316-0200853170 

  *Por favor de enviar capture una vez hecho el pago*
`;
  };

  const btnToCopyMessages = (rowData) => {
    return (
      <div className="flex gap-x-2 justify-center">
        <CopyToClipboardButton
          buttonText="Bienvenida"
          textToCopy={getWelcomeMessage(rowData)}
          style={
            "bg-black border rounded-xl text-bold p-1.5  hover:bg-sky-600 focus:bg-black transition-colors"
          }
        />
        <CopyToClipboardButton
          buttonText="Expiracion"
          textToCopy={getExpirationMessage(rowData)}
          style={
            "bg-black border rounded-xl text-bold p-1.5  hover:bg-red-600 focus:bg-black transition-colors"
          }
        />
      </div>
    );
  };

  const phoneNumberBody = ({ numero }) => {
    /*
    const whatsappUrl = `https://wa.me/+51${numero}?text=${encodeURIComponent(
      message
    )}`;

    return (
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        {numero}
      </a>
    );*/
    return numero;
  };

  //Modal Style
  const modalStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    initFilters();
  }, []);

  return (
    <div>
      <DataTable
        ref={streamingProfilesTableRef}
        value={profilesData}
        paginator
        rows={rowPerPages}
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 200, 400, 1000]}
        totalRecords={profilesData.length}
        style={{ fontSize: "14px" }}
        showGridlines
        size="small"
        dataKey="id"
        filters={filters}
        globalFilterFields={[
          "numero",
          "plataforma",
          "etiqueda",
          "precio",
          "perfil",
          "correo",
          "renovacion",
        ]}
        onRowClick={handleRowEdit}
        header={header}>
        <Column
          header="Telefono"
          field="telefono"
          filterField="telefono"
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "12rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar telefono"
          body={phoneNumberBody}
        />
        <Column
          header="Precio"
          field="precio"
          filterField="precio"
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "7rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          body={({ renovacion, precio }) =>
            coloredCell({ renovacion, value: precio })
          }
        />
        <Column
          header="Plataforma"
          field="plataforma"
          filterField="plataforma"
          style={{ width: "7rem", textAlign: "center" }}
          filter
          filterMenuStyle={{ width: "15rem" }}
          headerClassName="centered-header"
          body={({ renovacion, plataforma }) =>
            coloredCell({ renovacion, value: plataforma })
          }
        />
        <Column
          header="Correo"
          field="correo"
          filterField="correo"
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "20rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          body={({ renovacion, correo }) =>
            coloredCell({ renovacion, value: correo })
          }
        />

        <Column
          header="Perfil"
          field="perfil"
          filterField="perfil"
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "8rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          body={({ renovacion, perfil }) =>
            coloredCell({ renovacion, value: perfil })
          }
        />
        <Column
          header="Pin"
          field="pin"
          filterField="pin"
          filterMenuStyle={{ width: "12rem" }}
          style={{ width: "6rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          body={({ renovacion, pin }) =>
            coloredCell({ renovacion, value: pin })
          }
        />
        <Column
          header="Vencimiento"
          field="vencimiento"
          filterField="vencimiento"
          dataType="date"
          body={dateBodyTemplate}
          style={{ width: "7rem", textAlign: "center" }}
          filter
          filterElement={dateFilterTemplate}
          filterMenuStyle={{ width: "15rem" }}
          headerClassName="centered-header"
        />
        <Column
          header="Renovacion"
          field="renovacion"
          filterField="renovacion"
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "9rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          body={({ renovacion }) =>
            coloredCell({ renovacion, value: renovacion })
          }
        />
        <Column
          header="Mensajes"
          style={{ width: "4rem", textAlign: "center" }}
          body={btnToCopyMessages}
          headerClassName="centered-header"
        />
      </DataTable>

      <Modal
        open={openContactModal}
        onClose={handleContactModal}
        style={modalStyle}>
        <StreamingForm
          handleModal={handleContactModal}
          modalStyle={modalStyle}
        />
      </Modal>

      <Modal open={editing} onClose={handleEdit} style={modalStyle}>
        <StreamingForm
          handleModal={handleEdit}
          editMode={editing}
          selectedCustomer={selectedCustomer}
          modalStyle={modalStyle}
        />
      </Modal>

      <Modal open={isOpen} onClose={handleModal} style={modalStyle}>
        <DeleteModal
          message="¿Desea eliminar la cuenta?"
          account={selectedCustomer}
          closeModal={handleModal}
          deleteFn={onDelete}
          modalStyle={modalStyle}
        />
      </Modal>
    </div>
  );
};

export default StreamingProfilesTable;
