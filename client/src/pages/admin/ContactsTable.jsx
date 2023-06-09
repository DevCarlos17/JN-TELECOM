import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import ContactForm from "../../components/ContactForm.jsx";
import { Modal } from "@mui/material";
import useContactForm from "../../hooks/useContactForm.jsx";
import { AiOutlineEdit } from "react-icons/ai";
import { useUserContext } from "../../context/userContext.jsx";
import { ROL } from "../../helper/Roles.js";
import { MdDoNotDisturbAlt } from "react-icons/md";

const ContactsTable = () => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [filters, setFilters] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const { contactos } = useContactForm();
  const { user } = useUserContext();
  console.log(contactos, "tabla");

  const data = [
    {
      vendedor: "Neilybeth",
      telefono: 123123,
      estado: "123123",
    },
  ];

  const rowPerPages = 10;

  //Handles
  const handleEdit = () => setEditing(!editing);
  const handleContactModal = () => setOpenContactModal(!openContactModal);
  const handleRowEdit = (event) => {
    const { originalEvent, data } = event;
    const { target } = originalEvent;

    if (
      target.cellIndex === 6 ||
      target.cellIndex === 7 ||
      target.cellIndex === 8
    )
      return;
    if (user?.rol !== ROL.ADMIN) return;
    setSelectedCustomer(data);
    handleEdit();
  };

  //Filter
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

      nombreVendedor: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      telefono: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      estado: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
    setGlobalFilterValue("");
  };

  //Headaer

  //Convert sales filtered
  const getFilteredSales = () => {
    const tabla = dataTableRef.current.getTable();

    //Nombre de las colummnas
    const columnaHeader = Array.from(tabla.querySelectorAll(".p-column-title"));

    //Body de la tabla
    const bodyTable = tabla.querySelector(".p-datatable-tbody");
    const filas = Array.from(bodyTable.querySelectorAll('[role="row"]'));
    console.log(filas);

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
        <div>
          <Button
            type="button"
            label="Agregar"
            severity="info"
            everity="info"
            rounded
            onClick={setOpenContactModal}
          />
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
  const header = renderHeader();

  // Columns Body
  // Date Body
  const formatDate = (value) => {
    return new Date(value).toLocaleTimeString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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

  //State Body
  const estadoBodyTemplate = ({ estado }) => {
    return <div>{estado}</div>;
  };

  //Edite Body
  function handleEditClick(customerData) {
    setSelectedCustomer(customerData);
    handleEdit();
  }

  const isDisabledEdit = () => {
    return user?.rol === ROL.ADMIN ? false : true;
  };
  const ButtonsEdit = ({ rowData }) => (
    <div className="flex gap-1 justify-center h-9">
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
        {isDisabledEdit() ? (
          <div className="flex gap-1 justify-center text-2xl text-red-500">
            <MdDoNotDisturbAlt />
          </div>
        ) : (
          <ButtonsEdit rowData={rowData} />
        )}
      </div>
    );
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
        value={data}
        totalRecords={data.length}
        paginator
        rows={rowPerPages}
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 200, 400, 1000]}
        style={{ fontSize: "14px" }}
        size="small"
        loading={loading}
        dataKey="id"
        globalFilterFields={[]}
        showGridlines
        onRowClick={handleRowEdit}
        header={header}>
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
          field="vendedor"
          header="Vendedor"
          filter
          filterPlaceholder="Buscar por nombre"
          filterMenuStyle={{ width: "15rem" }}
          bodyStyle={{ margin: "0px" }}
          style={{ minWidth: "10rem" }}
          headerClassName="centered-header"
        />
        <Column
          field="telefono"
          header="Telefono"
          filterField="telefono"
          style={{ minWidth: "6rem", textAlign: "center" }}
          filterMenuStyle={{ width: "14rem" }}
          filter
          headerClassName="centered-header"
          filterPlaceholder="Filtrar telefono"
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
      </DataTable>
      <Modal
        open={openContactModal}
        onClose={handleContactModal}
        style={modalStyle}>
        <ContactForm handleEdit={handleContactModal} modalStyle={modalStyle} />
      </Modal>
      <Modal open={editing} onClose={handleEdit} style={modalStyle}>
        <ContactForm
          editMode={editing}
          handleEdit={handleEdit}
          selectedCustomer={selectedCustomer}
          modalStyle={modalStyle}
        />
      </Modal>
    </div>
  );
};

export default ContactsTable;
