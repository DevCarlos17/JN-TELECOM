import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useSalesContext } from "../context/salesContext.jsx";
import { Modal } from "@mui/material";
import FormSale from "./FormSale.jsx";
import { useUserContext } from "../context/userContext.jsx";
import { ROL } from "../helper/Roles.js";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { ImImages } from "react-icons/im";
import EditFiles from "./EditFiles.jsx";

export default function DataTableSales() {
  const { sales, uploadImages } = useSalesContext();
  const { user } = useUserContext();

  const [editing, setEditing] = useState(false);
  const [editingFiles, setEditingFiles] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [results] = useState([
    "VENTA",
    "INGRESADA",
    "PAGADA",
    "INSTALADA",
    "ZONA SATURADA",
    "ARBITRAJE",
    "NO GRABO",
    "SIN FOTO",
    "RECHAZADA",
  ]);
  const [serviciosTipos] = useState([
    "AAHH",
    "CONDOMINIO",
    "RESIDENCIA",
    "RURAL",
  ]);

  const [predios] = useState(["CASA", "EDIFICIO"]);

  const rowPerPage = 10;

  const handleEdit = () => setEditing(!editing);
  const handleEditingFiles = () => setEditingFiles(!editingFiles);

  function handleEditClick(customerData) {
    setSelectedCustomer(customerData);
    handleEdit();
  }
  function handleEditFiles(customerData) {
    setSelectedCustomer(customerData);
    handleEditingFiles();
  }

  const getSeverity = (status) => {
    switch (status) {
      case "VENTA":
        return "";

      case "INGRESADA":
        return "bg-gray-400";

      case "PAGADA":
        return "bg-lime-500";

      case "INSTALADA":
        return "bg-blue-500";

      case "RECHAZADA":
        return "bg-red-500";

      case "ZONA SATURADA":
        return "bg-yellow-500";

      case "ARBITRAJE":
        return "bg-pink-500";

      case "NO GRABO":
        return "bg-purple-600";

      case "SIN FOTO":
        return "bg-black text-white";
    }
  };

  useEffect(() => {
    initFilters();
  }, [sales]);

  const handleSelectedCustomer = (customer) => {
    console.log(customer);
  };

  const formatDate = (value) => {
    return new Date(value).toLocaleTimeString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const clearFilter = () => {
    initFilters();
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
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      nombreCompleto: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      result: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      estado: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      numeroDocumento: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      telefonoContacto: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      telefonoReferencia: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      departamento: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      provincia: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      distrito: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      vendedor: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      supervisor: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      servicioTipo: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      predio: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      direccion: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      observacion: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
    });
    setGlobalFilterValue("");
  };

  //Excel's Functions
  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(sales);
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
        <div>
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

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.createdAt);
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

  const resultBodyTemplate = ({ result }) => {
    return (
      <div
        className={` ${getSeverity(
          result
        )} rounded font-bold text-center text-gray-900  text-sm`}>
        {result}
      </div>
    );
  };

  const resultFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={results}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={resultItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const resultItemTemplate = (option) => {
    return (
      <div
        className={` ${getSeverity(
          option
        )} rounded font-bold text-center text-gray-900  text-sm`}>
        {option}
      </div>
    );
  };
  const predioFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={predios}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={predioItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const predioItemTemplate = (option) => {
    return <div>{option}</div>;
  };

  const typeServicesFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={serviciosTipos}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={typeServiciesItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const typeServiciesItemTemplate = (option) => {
    return <div>{option}</div>;
  };

  const planBodyTemplate = ({ plan }) => {
    const { megas, price, velocity, currency } = plan;
    return (
      <div className="font-bold">
        {megas} {velocity} S/{price}
      </div>
    );
  };

  const aditionalBodyTemplate = ({ aditional }) => {
    const { name, price } = aditional;
    return <div className="font-bold">{`${name}: S/${price} `}</div>;
  };

  const meshBodyTemplate = ({ mesh }) => {
    return <div className="font-bold">{mesh}</div>;
  };
  const totalPaymentBodyTemplate = ({ totalPayment }) => {
    return <div className="font-bold">S/{totalPayment}</div>;
  };

  const validateBtnEdit = (state) => state !== "VENTA";

  const isDisabledEdit = ({ result }) => {
    return user?.rol === ROL.ADMIN ? false : validateBtnEdit(result);
  };

  const ButtonsEdit = ({ rowData }) => (
    <div className="flex gap-1 justify-center h-9">
      <button
        className="flex text-green-500 hover:bg-green-500  items-center rounded-full  hover:text-white transition-colors text-[20px] w-10 justify-center"
        disabled={isDisabledEdit(rowData)}
        onClick={() => handleEditFiles(rowData)}>
        <ImImages />
      </button>
      <button
        className="flex text-blue-500 hover:bg-blue-500  items-center rounded-full hover:text-white transition-colors text-[20px] w-10 justify-center"
        disabled={isDisabledEdit(rowData)}
        onClick={() => handleEditClick(rowData)}>
        <AiOutlineEdit />
      </button>
    </div>
  );

  const btnEditBodyTemplate = (rowData) => {
    return (
      <div>
        {isDisabledEdit(rowData) ? (
          <div className="flex gap-1 justify-center text-2xl text-red-500">
            <MdDoNotDisturbAlt />
          </div>
        ) : (
          <ButtonsEdit rowData={rowData} />
        )}
      </div>
    );
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const header = renderHeader();

  const styleModal = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <DataTable
        className="bg-white w-[90vw] rounded-lg p-1"
        value={sales}
        paginator
        rows={rowPerPage}
        totalRecords={sales.length}
        style={{ fontSize: "14px" }}
        showGridlines
        size="small"
        loading={loading}
        dataKey="id"
        filters={filters}
        globalFilterFields={[
          "nombreCompleto",
          "estado",
          "provincia",
          "documentoTipo",
          "numeroDocumento",
          "telefonoContacto",
          "telefonoReferencia",
          "departamento",
          "provincia",
          "distrito",
          "vendedor",
          "supervisor",
          "servicioTipo",
          "predio",
          "result",
        ]}
        header={header}
        emptyMessage="No customers found.">
        <Column
          header="Editar"
          style={{ minWidth: "6rem", textAlign: "center" }}
          body={btnEditBodyTemplate}
          headerClassName="centered-header"
        />
        <Column
          field="createdAt"
          header="Fecha"
          filterField="date"
          dataType="date"
          style={{ minWidth: "6rem" }}
          body={dateBodyTemplate}
          filter
          filterElement={dateFilterTemplate}
          headerClassName="centered-header"
        />
        <Column
          field="nombreCompleto"
          header="Nombre Completo"
          filter
          filterPlaceholder="Buscar por nombre"
          filterMenuStyle={{ width: "14rem" }}
          bodyStyle={{ margin: "0px" }}
          style={{ minWidth: "9rem" }}
          headerClassName="centered-header"
        />
        <Column
          field="result"
          header="Resultado"
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "6rem" }}
          body={resultBodyTemplate}
          filter
          filterElement={resultFilterTemplate}
          headerClassName="centered-header"
        />

        <Column
          field="estado"
          header="Estado"
          filterField="estado"
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "6rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
        />
        <Column
          field="documentoTipo"
          header="Tipo Documento"
          filterField="documentoTipo"
          filterMenuStyle={{ width: "14rem" }}
          headerClassName="centered-header"
          style={{ minWidth: "4rem", textAlign: "center" }}
        />
        <Column
          field="numeroDocumento"
          header="Documento"
          filterField="numeroDocumento"
          style={{ minWidth: "6rem", textAlign: "center" }}
          bodyStyle={{ padding: "0.5rem" }}
          filterMenuStyle={{ width: "14rem" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar documento"
        />
        <Column
          field="telefonoContacto"
          header="Telefono"
          filterField="telefonoContacto"
          style={{ minWidth: "6rem", textAlign: "center" }}
          filterMenuStyle={{ width: "14rem" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar telefono"
        />
        <Column
          field="telefonoReferencia"
          header="Telefono #2"
          filterField="telefonoReferencia"
          style={{ minWidth: "9rem", textAlign: "center" }}
          filterMenuStyle={{ width: "14rem" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar telefono"
        />
        <Column
          field="departamento"
          header="Departamento"
          filterField="departamento"
          style={{ minWidth: "5rem", textAlign: "center" }}
          filterMenuStyle={{ width: "14rem" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar departamento"
        />
        <Column
          field="provincia"
          header="Provincia"
          filterField="provincia"
          style={{ minWidth: "6rem", textAlign: "center" }}
          filterMenuStyle={{ width: "14rem" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar provincia"
        />
        <Column
          field="distrito"
          header="Distrito"
          filterField="distrito"
          style={{ minWidth: "6rem", textAlign: "center" }}
          filterMenuStyle={{ width: "14rem" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar distrito"
        />
        <Column
          field="vendedor"
          header="Vendedor"
          filterField="vendedor"
          style={{ minWidth: "6rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar vendedor"
        />
        <Column
          field="supervisor"
          header="Supervisor"
          filterField="supervisor"
          style={{ minWidth: "6rem", textAlign: "center" }}
          filterMenuStyle={{ width: "14rem" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar supervisor"
        />
        <Column
          header="Tipo de servicio"
          filterField="servicioTipo"
          field="servicioTipo"
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "5rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          filterElement={typeServicesFilterTemplate}
        />
        <Column
          header="Predio"
          field="predio"
          filterField="predio"
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "5rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          filterElement={predioFilterTemplate}
        />
        <Column
          header="Paquete"
          field="plan"
          filterField="plan"
          style={{ minWidth: "10rem", textAlign: "center" }}
          headerClassName="centered-header"
          body={planBodyTemplate}
        />
        <Column
          field="adicional"
          header="Adicional"
          style={{ minWidth: "8rem", textAlign: "center" }}
          headerClassName="centered-header"
          body={aditionalBodyTemplate}
        />
        <Column
          field="mes"
          header="Mesh"
          style={{ minWidth: "3rem", textAlign: "center" }}
          headerClassName="centered-header"
          body={meshBodyTemplate}
        />
        <Column
          field="totalPayment"
          header="Soles a pagar"
          style={{ minWidth: "3rem", textAlign: "center" }}
          headerClassName="centered-header"
          body={totalPaymentBodyTemplate}
        />
        <Column
          field="email"
          header="Email"
          filterField="email"
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar email"
        />
        <Column
          field="direccion"
          header="Direccion"
          filterField="direccion"
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "15rem", textAlign: "center" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar direccion"
        />
        <Column
          field="observacion"
          header="Observacion"
          headerClassName="centered-header"
          style={{ minWidth: "12rem", textAlign: "center" }}
        />
      </DataTable>
      <Modal open={editing} onClose={handleEdit} style={styleModal}>
        <FormSale
          editMode={editing}
          handleEdit={handleEdit}
          selectedCustomer={selectedCustomer}
          styleModal={styleModal}
        />
      </Modal>
      <Modal
        open={editingFiles}
        onClose={handleEditingFiles}
        style={styleModal}>
        <EditFiles
          editMode={editingFiles}
          handleEditingFiles={handleEditingFiles}
          selectedCustomer={selectedCustomer}
          styleModal={styleModal}
        />
      </Modal>
    </>
  );
}
