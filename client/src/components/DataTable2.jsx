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
import FormProcessedSale from "./FormProcessedSale.jsx";
import PreventionNotice from "./PreventionNotice.jsx";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import useModal from "../hooks/useModal.jsx";
import { useVerticalGrowthContext } from "../context/verticalGrowthContext.jsx";

import {
  SERVICE_OPERATORS,
  PROCESSED_SALE_RESULTS,
} from "../helper/FormData.js";
import { toaster } from "../helper/utils.js";

export default function DataTableSales({ verticalGrowth = false, paidSales }) {
  const { sales, handleSaleImages, getSales, salesFiltered, deleteSale } =
    useSalesContext();

  const data = verticalGrowth ? paidSales : salesFiltered;

  const dataTable = data.map((sale) => {
    return { ...sale, createdAt: new Date(sale.createdAt) };
  });
  const navigate = useNavigate();
  const { user } = useUserContext();

  const { deleteProcessedSale } = useVerticalGrowthContext();

  const dataTableRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [editingFiles, setEditingFiles] = useState(false);
  const [modalAddData, setModalAddData] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);

  const { isOpen, handleModal } = useModal();

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

  const operators = Object.values(SERVICE_OPERATORS);

  const [serviciosTipos] = useState([
    "AAHH",
    "CONDOMINIO",
    "RESIDENCIA",
    "RURAL",
  ]);

  const [predios] = useState(["CASA", "EDIFICIO"]);

  const rowPerPage = 9;

  const handleEdit = () => setEditing(!editing);
  const handleEditingFiles = () => setEditingFiles(!editingFiles);

  const handleAddButtonClick = () => {
    setModalAddData(!modalAddData);
  };

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

      case "PROGRAMADA":
        return "bg-cyan-500";

      case "SIN FOTO":
        return "bg-black text-white";

      case "WIN":
        return "bg-win text-white";

      case "NUBYX":
        return "bg-nubyx text-white";

      case "CLARO":
        return "bg-claro text-white";

      case "WOW":
        return "bg-wow text-white";

      case "GPON":
        return "bg-yellow-500 text-white";

      case "DERIVADO A ASIGNACIÓN":
        return "";

      case "ASIGNADO":
        return "bg-orange-500";

      case "CARTA DE AUTORIZACIÓN POR FIMAR":
        return "bg-sky-500";

      case "CARTA DE AUTORIZACIÓN FIRMADA":
        return "bg-blue-600";

      case "VISITA TECNICA PROGRAMADA":
        return "bg-pink-500";

      case "VISITA TECNICA REALIZADA":
        return "bg-black text-white";

      case "OBRAS EN EL PREDIO":
        return "bg-gray-500";

      case "HABILITADO":
        return "bg-lime-500";

      case "RECHAZADO":
        return "bg-red-600";

      case "INFORME TSS POR APROBAR":
        return "bg-purple-500";
    }
  };

  useEffect(() => {
    initFilters();
  }, []);

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
      createdAt: {
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
      operador: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      resultado: {
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
      nombrePredio: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      vicepresidente: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      administrador: {
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

  //Convert sales filtered
  const getFilteredSales = () => {
    const tabla = dataTableRef.current.getTable();

    //Nombre de las colummnas
    const columnaHeader = Array.from(tabla.querySelectorAll(".p-column-title"));

    //Body de la tabla
    const bodyTable = tabla.querySelector(".p-datatable-tbody");
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
      const worksheet = xlsx.utils.json_to_sheet(getFilteredSales());
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
        <div className="gap-2 md:flex">
          {!verticalGrowth && (
            <Button
              type="button"
              security="info"
              label="Agregar"
              rounded
              onClick={() => navigate("/newSale")}
            />
          )}
          {verticalGrowth && (
            <Button
              type="button"
              security="info"
              label="Agregar"
              rounded
              onClick={handleAddButtonClick}
            />
          )}

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
        )} rounded font-bold text-center text-gray-900 text-sm`}>
        {result}
      </div>
    );
  };
  const resultadoBodyTemplate = ({ resultado }) => {
    return (
      <div
        className={` ${getSeverity(
          resultado
        )} rounded font-bold text-center text-gray-900 text-sm`}>
        {resultado}
      </div>
    );
  };

  const operatorBodyTemplate = ({ operador }) => {
    return (
      <div
        className={` ${getSeverity(
          operador
        )} rounded font-bold text-center text-gray-900  text-sm`}>
        {operador}
      </div>
    );
  };

  const estadoBodyTemplate = ({ estado }) => {
    return <div>{estado}</div>;
  };

  const operatorFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={operators}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={operadorItemTemplate}
        placeholder="Operadores"
        className="p-column-filter"
        showClear
      />
    );
  };
  const resultFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={results}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={resultItemTemplate}
        placeholder="Resultados"
        className="p-column-filter"
        showClear
      />
    );
  };
  const resultadoFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={PROCESSED_SALE_RESULTS}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={resultItemTemplate}
        placeholder="Resultados"
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
        )} rounded font-bold text-center text-gray-900 text-sm`}>
        {option}
      </div>
    );
  };

  const operadorItemTemplate = (option) => {
    return (
      <div
        className={` ${getSeverity(
          option
        )} rounded font-bold text-center text-gray-900 text-sm`}>
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
    return <div className="font-bold">{totalPayment}</div>;
  };

  const comisionBodyTemplate = ({ comision }) => {
    return <div className="font-bold">{comision}</div>;
  };

  const validateBtnEdit = (state) => state !== "VENTA";

  const isDisabledEdit = ({ result }) => {
    return user?.rol === ROL.ADMIN ? false : validateBtnEdit(result);
  };

  const isAdmin = (user) => {
    return user?.rol === ROL.ADMIN;
  };

  const handleRowEdit = (event) => {
    const { originalEvent, data } = event;
    const { target } = originalEvent;

    if (
      target.cellIndex === 7 ||
      target.cellIndex === 8 ||
      target.cellIndex === 9
    )
      return;
    if (user?.rol !== ROL.ADMIN) return;
    setSelectedCustomer(data);
    handleEdit();
  };

  const handleVerticalRowEdit = (event) => {
    const { originalEvent, data } = event;
    const { target } = originalEvent;
    if (user?.rol !== ROL.ADMIN) return;
    setSelectedCustomer(data);
    handleEdit();
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

  const handleDeleteClick = (rowData) => {
    setSelectedSale(rowData);
    handleModal();
  };

  const actionsBody = (rowData) => {
    return (
      <div className="flex gap-1 justify-center h-9">
        <button
          className="flex text-red-500 hover:bg-red-500  items-center rounded-full hover:text-white transition-colors text-[20px] w-10 justify-center"
          onClick={() => handleDeleteClick(rowData)}>
          <RiDeleteBin6Line />
        </button>
      </div>
    );
  };

  const handleDeleteSale = async () => {
    if (verticalGrowth) {
      toaster(deleteProcessedSale(selectedSale));
      return handleModal();
    }

    toaster(deleteSale(selectedSale));
    return handleModal();
  };

  const header = renderHeader();

  const styleModal = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      {!verticalGrowth && (
        <DataTable
          ref={dataTableRef}
          className="w-[98vw]"
          value={dataTable}
          paginator
          rows={rowPerPage}
          rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 200, 400, 20000]}
          totalRecords={dataTable.length}
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
            "direccion",
            "operador",
            "comision",
          ]}
          header={header}
          onRowClick={handleRowEdit}
          emptyMessage="No customers found.">
          {isAdmin(user) && (
            <Column
              headerClassName="centered-header"
              header="Eliminar"
              style={{ width: "3rem", textAlign: "center" }}
              body={actionsBody}
              bodyStyle={{ textAlign: "center" }}
            />
          )}

          <Column
            header="Editar"
            style={{ minWidth: "6rem", textAlign: "center" }}
            body={btnEditBodyTemplate}
            headerClassName="centered-header"
          />

          <Column
            header="Fecha"
            field="createdAt"
            filterField="createdAt"
            dataType="date"
            body={dateBodyTemplate}
            style={{ minWidth: "6.5rem" }}
            filter
            filterElement={dateFilterTemplate}
            filterMenuStyle={{ width: "15rem" }}
            headerClassName="centered-header"
          />
          <Column
            field="operador"
            header="Operador"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "7rem" }}
            body={operatorBodyTemplate}
            filter
            filterElement={operatorFilterTemplate}
            headerClassName="centered-header"
          />
          {!verticalGrowth && (
            <Column
              field="nombreCompleto"
              header="Nombre Completo"
              filter
              filterPlaceholder="Buscar por nombre"
              filterMenuStyle={{ width: "15rem" }}
              bodyStyle={{ margin: "0px" }}
              style={{ minWidth: "10rem", textAlign: "center" }}
              headerClassName="centered-header"
            />
          )}

          <Column
            field="result"
            header="Resultado"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "8rem" }}
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
            style={{ minWidth: "12rem", textAlign: "center" }}
            filter
            headerClassName="centered-header"
            body={estadoBodyTemplate}
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
            style={{ minWidth: "8rem", textAlign: "center" }}
            filterMenuStyle={{ width: "14rem" }}
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
            field="comision"
            header="Comision"
            style={{ minWidth: "3rem", textAlign: "center" }}
            headerClassName="centered-header"
            body={comisionBodyTemplate}
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
      )}
      {verticalGrowth && (
        <DataTable
          ref={dataTableRef}
          className="w-[98vw]"
          value={dataTable}
          paginator
          rows={rowPerPage}
          rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 200, 400, 1000]}
          totalRecords={dataTable.length}
          style={{ fontSize: "14px" }}
          showGridlines
          size="small"
          loading={loading}
          dataKey="id"
          filters={filters}
          globalFilterFields={[
            "predio",
            "nombrePredio",
            "presidente",
            "administrador",
            "direccion",
            "distrito",
            "supervisor",
            "estado",
            "resultado",
          ]}
          onRowClick={handleVerticalRowEdit}
          header={header}
          emptyMessage="No customers found.">
          <Column
            headerClassName="centered-header"
            header="ELIMINAR"
            style={{ width: "3rem", textAlign: "center" }}
            body={actionsBody}
            bodyStyle={{ textAlign: "center" }}
          />

          <Column
            header="Fecha"
            field="createdAt"
            filterField="createdAt"
            dataType="date"
            body={dateBodyTemplate}
            style={{ width: "7rem", textAlign: "center" }}
            filter
            filterElement={dateFilterTemplate}
            filterMenuStyle={{ width: "15rem" }}
            headerClassName="centered-header"
          />
          <Column
            field="resultado"
            header="Resultado"
            filterField="resultado"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "12rem", textAlign: "center" }}
            filter
            body={resultadoBodyTemplate}
            filterElement={resultadoFilterTemplate}
            headerClassName="centered-header"
          />

          <Column
            field="estado"
            header="Estado"
            filterField="estado"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "12rem", textAlign: "center" }}
            filter
            headerClassName="centered-header"
            body={estadoBodyTemplate}
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
            header="Nombre del Predio"
            field="nombrePredio"
            filterField="nombrePredio"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "8rem", textAlign: "center" }}
            filter
            headerClassName="centered-header"
            filterPlaceholder="Filtrar predio"
          />
          <Column
            field="presidente"
            header="PRESIDENTE(A)"
            filterField="vicepresidente"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "5rem", textAlign: "center" }}
            filter
            headerClassName="centered-header"
            filterPlaceholder="Filtrar vicepresidente"
          />
          <Column
            field="administrador"
            header="PROPIETARIO(A)"
            filterField="administrador"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "6rem", textAlign: "center" }}
            filter
            headerClassName="centered-header"
            filterPlaceholder="Filtrar administrador(a)"
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
            field="supervisor"
            header="Supervisor"
            filterField="supervisor"
            style={{ minWidth: "6rem", textAlign: "center" }}
            filterMenuStyle={{ width: "14rem" }}
            filter
            headerClassName="centered-header"
            filterPlaceholder="Filtrar supervisor"
          />
        </DataTable>
      )}

      <Modal open={editing} onClose={handleEdit} style={styleModal}>
        {!verticalGrowth ? (
          <FormSale
            verticalGrouth={verticalGrowth}
            editMode={editing}
            handleModalForm={handleEdit}
            selectedCustomer={selectedCustomer}
            styleModal={styleModal}
          />
        ) : (
          <FormProcessedSale
            editMode={true}
            selectedSale={selectedCustomer}
            handleModalForm={handleEdit}
          />
        )}
      </Modal>

      <Modal
        open={editingFiles}
        onClose={handleEditingFiles}
        style={styleModal}>
        <EditFiles
          props={{
            handleSaleImages,
            getSales,
            sales,
            handleEditingFiles,
            selectedCustomer,
          }}
          styleModal={styleModal}
        />
      </Modal>

      <Modal
        open={modalAddData}
        onClose={handleAddButtonClick}
        style={styleModal}>
        <FormProcessedSale handleModalForm={handleAddButtonClick} />
      </Modal>

      <Modal style={styleModal} open={isOpen} onClose={handleModal}>
        <PreventionNotice
          action={handleDeleteSale}
          cancel={handleModal}
          selected={selectedSale}
        />
      </Modal>
    </>
  );
}
