import React, { useEffect, useState } from "react";
import useModalDeleteContact from "../hooks/useModalDeleteContact.jsx";
import PreventionNotice from "./PreventionNotice.jsx";
import FormFinancialRecord from "./FormFinancialRecord.jsx";
import { useFinancialRecordContext } from "../context/FinancialRecordsContext.jsx";
import useModal from "../hooks/useModal.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Modal } from "@mui/material";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { RiDeleteBin6Line } from "react-icons/ri";
import DataPicker from "./DataPicker.jsx";
import useDataPicker from "../hooks/useDataPicker.jsx";
import useFilterByDate from "../hooks/useFilterByDate.jsx";
import SelectOptions from "./SelectOptions.jsx";
import useSelectOptions from "../hooks/useSelectOptions.jsx";

const IncomeAndExpensesTable = () => {
  const filterOptions = [
    { name: "Semana", code: "week" },
    { name: "Mes", code: "month" },
    { name: "Año", code: "year" },
  ];
  const { selectedOption, handleOption } = useSelectOptions();
  const [selectedRecord, setSelectedRecord] = useState({});
  const { selectedDate, handleDateChange } = useDataPicker();
  const { filteredData, filterByOption } = useFilterByDate();
  const { updateFinancialRecord, deleteFinancialRecord, financialRecords } =
    useFinancialRecordContext();
  const { isOpenModalDelete, handleModalDeleteContact } =
    useModalDeleteContact();
  const { isOpen, handleModal } = useModal();

  const rowPerPages = 10;

  const styleModal = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  //Header
  const Header = () => {
    return (
      <div className=" flex justify-between">
        <div className="flex items-center gap-3">
          <DataPicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
          <SelectOptions
            options={filterOptions}
            selectedOption={selectedOption}
            handleOption={handleOption}
          />
          <div>
            <Button
              type="button"
              label="Filtrar"
              severity="warning"
              everity="info"
              onClick={() =>
                filterByOption({
                  data: financialRecords,
                  selectedOption,
                  selectedDate,
                })
              }
              style={{ color: "black" }}
            />
          </div>
          <div>
            <Button
              type="button"
              security="info"
              label="Agregar"
              onClick={handleModal}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleDeleteClick = ({ rowData }) => {
    setSelectedRecord(rowData);
    handleModalDeleteContact();
  };

  const deleteRecord = async () => {
    await deleteFinancialRecord(selectedRecord);
    handleModalDeleteContact();
  };

  const onRowEditComplete = async (e) => {
    let { newData } = e;

    const updatedRecord = {
      ...newData,
      total: newData.ingreso - newData.gasto,
    };

    await updateFinancialRecord(updatedRecord);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        style={{ textAlign: "center" }}
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const priceEditor = (options) => {
    return (
      <InputNumber
        style={{ width: "100%" }}
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="PEN"
        locale="es-PE"
      />
    );
  };

  const ingresoBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(rowData.ingreso);
  };

  const gastoBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(rowData.gasto);
  };

  const totalBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(rowData.total);
  };

  const formatDate = (value) => {
    return new Date(value).toLocaleTimeString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  //Bodys
  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.createdAt);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("es-Pe", {
      style: "currency",
      currency: "PEN",
    });
  };

  const incomeTotal = () => {
    let total = 0;

    for (let record of filteredData) {
      total += record.ingreso;
    }

    return formatCurrency(total);
  };

  const expenseTotal = () => {
    let total = 0;

    for (let record of filteredData) {
      total += record.gasto;
    }

    return formatCurrency(total);
  };

  const netoTotal = () => {
    let total = 0;

    for (let record of filteredData) {
      total += record.total;
    }

    return formatCurrency(total);
  };

  const actionsBody = (rowData) => {
    return (
      <div className="flex gap-1 justify-center h-9">
        <button
          className="flex text-red-500 hover:bg-red-500  items-center rounded-full hover:text-white transition-colors text-[20px] w-10 justify-center"
          onClick={(e) => handleDeleteClick({ rowData, e })}>
          <RiDeleteBin6Line />
        </button>
      </div>
    );
  };

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="TOTALS:"
          colSpan={3}
          footerStyle={{ textAlign: "center" }}
        />
        <Column style={{ textAlign: "center" }} footer={incomeTotal} />
        <Column
          colSpan={1}
          style={{ textAlign: "center" }}
          footer={expenseTotal}
        />
        <Column footer="" colSpan={1} footerStyle={{ textAlign: "right" }} />
        <Column
          style={{ textAlign: "center" }}
          colSpan={2}
          footer={netoTotal}
        />
      </Row>
    </ColumnGroup>
  );

  useEffect(() => {
    filterByOption(financialRecords, selectedOption, selectedDate);
  }, [financialRecords]);

  return (
    <div className="card p-fluid">
      <DataTable
        value={filteredData}
        className="w-[90vw]"
        header={Header}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        footerColumnGroup={footerGroup}
        showGridlines
        rows={rowPerPages}
        paginator
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 200, 400, 1000]}
        totalRecords={filteredData.length}
        style={{ fontSize: "14px" }}
        size="small">
        <Column
          headerClassName="centered-header"
          header="ELMINAR"
          style={{ width: "3rem", textAlign: "center" }}
          body={actionsBody}
          bodyStyle={{ textAlign: "center" }}
        />

        <Column
          headerClassName="centered-header"
          header="EDITAR"
          rowEditor
          headerStyle={{ width: "6rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
        <Column
          header="FECHA"
          field="createdAt"
          filterField="createdAt"
          dataType="date"
          body={dateBodyTemplate}
          style={{ width: "7rem", textAlign: "center" }}
          filterMenuStyle={{ width: "15rem" }}
          headerClassName="centered-header"
        />
        <Column
          headerClassName="centered-header"
          field="ingreso"
          header="INGRESOS"
          body={ingresoBodyTemplate}
          editor={(options) => priceEditor(options)}
          style={{ minWidth: "10rem", textAlign: "center" }}
        />
        <Column
          headerClassName="centered-header"
          field="gasto"
          header="GASTOS"
          body={gastoBodyTemplate}
          editor={(options) => priceEditor(options)}
          style={{ minWidth: "10rem", textAlign: "center" }}
        />

        <Column
          headerClassName="centered-header"
          field="motivo"
          header="MOTIVO DEL GASTO"
          editor={(options) => textEditor(options)}
          style={{ minWidth: "10rem", textAlign: "center" }}
        />

        <Column
          headerClassName="centered-header"
          field="total"
          header="TOTAL"
          body={totalBodyTemplate}
          style={{ minWidth: "12rem", textAlign: "center" }}
        />
      </DataTable>
      <Modal style={styleModal} open={isOpen} onClose={handleModal}>
        <FormFinancialRecord handleModal={handleModal} />
      </Modal>
      <Modal
        style={styleModal}
        open={isOpenModalDelete}
        onClose={handleModalDeleteContact}>
        <PreventionNotice
          action={deleteRecord}
          cancel={handleModalDeleteContact}
          selected={selectedRecord}
        />
      </Modal>
    </div>
  );
};

export default IncomeAndExpensesTable;
