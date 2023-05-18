import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { CustomerService } from "../helper/CustomService.jsx";
import { useSalesContext } from "../context/salesContext.jsx";

export default function AdvancedFilterDemo() {
  const { sales } = useSalesContext();
  const [customers, setCustomers] = useState(null);
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
  ]);
  const [serviciosTipos] = useState([
    "AAHH",
    "CONDOMINIO",
    "RESIDENCIA",
    "RURAL",
  ]);

  const [predios] = useState(["CASA", "EDIFICIO"]);

  const getSeverity = (status) => {
    switch (status) {
      case "VENTA":
        return "warning";

      case "INGRESADA":
        return "success";

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
    }
  };

  useEffect(() => {
    CustomerService.getCustomersMedium().then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
    initFilters();
  }, []);

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);

      return d;
    });
  };

  const formatDate = (value) => {
    return new Date(value).toLocaleTimeString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
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

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar  "
          outlined
          onClick={clearFilter}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Busqueda rapida"
          />
        </span>
      </div>
    );
  };

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        severity="secondary"></Button>
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        severity="success"></Button>
    );
  };

  const filterFooterTemplate = () => {
    return <div className="px-3 pt-0 pb-3 text-center">Filter by Country</div>;
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

  const resultBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.result} severity={getSeverity(rowData.result)} />
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
    return <Tag value={option} severity={getSeverity(option)} />;
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

  const header = renderHeader();

  return (
    <DataTable
      className="bg-white w-[90vw] p-2 rounded-lg"
      style={{ fontSize: "14px" }}
      value={sales}
      paginator
      showGridlines
      rows={10}
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
        field="createdAt"
        header="Fecha"
        filterField="date"
        dataType="date"
        style={{ minWidth: "10rem" }}
        body={dateBodyTemplate}
        filter
        filterElement={dateFilterTemplate}
      />
      <Column
        field="nombreCompleto"
        header="Nombre Completo"
        filter
        filterPlaceholder="Buscar por nombre"
        style={{ minWidth: "12rem" }}
      />
      <Column
        field="result"
        header="Resultado"
        filterMenuStyle={{ width: "14rem" }}
        style={{ minWidth: "6rem" }}
        body={resultBodyTemplate}
        filter
        filterElement={resultFilterTemplate}
      />

      <Column
        field="estado"
        header="Estado"
        filterField="estado"
        filterMenuStyle={{ width: "14rem" }}
        style={{ minWidth: "6rem" }}
        filter
      />
      <Column
        field="documentoTipo"
        header="Tipo Documento"
        filterField="documentoTipo"
        style={{ minWidth: "5rem" }}
      />
      <Column
        field="numeroDocumento"
        header="# Documento"
        filterField="numeroDocumento"
        style={{ minWidth: "12rem" }}
        filter
        filterPlaceholder="Filtrar documento"
      />
      <Column
        field="telefonoContacto"
        header="Telefono"
        filterField="telefonoContacto"
        style={{
          minWidth: "6rem",
        }}
        filter
        filterPlaceholder="Filtrar telefono"
      />
      <Column
        field="telefonoReferencia"
        header="Telefono #2"
        filterField="telefonoReferencia"
        style={{ minWidth: "9rem" }}
        filter
        filterPlaceholder="Filtrar telefono"
      />
      <Column
        field="departamento"
        header="Departamento"
        filterField="departamento"
        style={{ minWidth: "12rem" }}
        filter
        filterPlaceholder="Filtrar departamento"
      />
      <Column
        field="provincia"
        header="Provincia"
        filterField="provincia"
        style={{ minWidth: "12rem" }}
        filter
        filterPlaceholder="Filtrar provincia"
      />
      <Column
        field="distrito"
        header="Distrito"
        filterField="distrito"
        style={{ minWidth: "12rem" }}
        filter
        filterPlaceholder="Filtrar distrito"
      />
      <Column
        field="vendedor"
        header="Vendedor"
        filterField="vendedor"
        style={{ minWidth: "12rem" }}
        filter
        filterPlaceholder="Filtrar vendedor"
      />
      <Column
        field="supervisor"
        header="Supervisor"
        filterField="supervisor"
        style={{ minWidth: "12rem" }}
        filter
        filterPlaceholder="Filtrar supervisor"
      />
      <Column
        header="Tipo de servicio"
        filterField="servicioTipo"
        field="servicioTipo"
        style={{ minWidth: "12rem" }}
        filter
        filterElement={typeServicesFilterTemplate}
      />
      <Column
        header="Predio"
        field="predio"
        filterField="predio"
        style={{ minWidth: "8rem" }}
        filter
        filterElement={predioFilterTemplate}
      />
      <Column
        header="Paquete"
        filterField="plan"
        style={{ minWidth: "3rem" }}
      />
      <Column
        header="Adicional"
        filterField="aditional"
        style={{ minWidth: "3rem" }}
      />
      <Column header="Mesh" filterField="mesh" style={{ minWidth: "3rem" }} />
      <Column
        field="email"
        header="Email"
        filterField="email"
        style={{ minWidth: "12rem" }}
        filter
        filterPlaceholder="Filtrar email"
      />
      <Column
        field="direccion"
        header="Direccion"
        filterField="direccion"
        style={{ minWidth: "12rem" }}
        filter
        filterPlaceholder="Filtrar direccion"
      />
      <Column
        field="observacion"
        header="Observacion"
        style={{ minWidth: "12rem" }}
        filter
        filterPlaceholder="Search by country"
        filterClear={filterClearTemplate}
        filterApply={filterApplyTemplate}
        filterFooter={filterFooterTemplate}
      />
    </DataTable>
  );
}
