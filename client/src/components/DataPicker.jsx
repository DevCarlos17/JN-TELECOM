import React from "react";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";

const DataPicker = ({ selectedDate, handleDateChange }) => {
  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  return (
    <div className="card flex justify-content-center">
      <Calendar
        placeholder="Filtrar por fecha"
        value={selectedDate}
        onChange={handleDateChange}
        locale="es"
        dateFormat="dd/mm/yy"
        showIcon
      />
    </div>
  );
};

export default DataPicker;
