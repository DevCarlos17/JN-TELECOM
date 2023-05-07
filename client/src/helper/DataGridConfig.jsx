//Colmns
function getCellBackgroundColor({ estado }) {
  switch (estado.toLowerCase()) {
    case "venta":
      return "";

    case "ingresada":
      return "bg-gray-400";

    case "pagada":
      return "bg-lime-500";

    case "instalada":
      return "bg-blue-500";

    case "rechazada":
      return "bg-red-500";

    case "zona saturada":
      return "bg-yellow-500";

    case "arbitraje":
      return "bg-pink-500";
  }
}

const convertToUpperCase = (value) => value.toUpperCase();

const dateFormat = ({ value }) =>
  value &&
  new Date(value).toLocaleTimeString("ISO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const renderCellState = ({ row }) => (
  <div className={` w-full text-center ${getCellBackgroundColor(row)}`}>
    {row.estado}
  </div>
);

const renderCellFullName = ({ row }) => (
  <div>
    {row.nombre} {row.apellido}
  </div>
);

export const columns = [
  {
    field: "createdAt",
    headerName: "FECHA INGRESO",
    headerClassName: "headerStyle",
    type: "date",
    valueFormatter: dateFormat,
    sortable: true,
    headerAlign: "center",
    align: "center",
    editable: false,
    width: 190,
  },
  {
    field: "estado",
    headerName: "ESTADO",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    sortable: true,
    width: 140,
    editable: true,
    renderCell: renderCellState,
    valueParser: convertToUpperCase,
  },

  {
    field: "nombreCompleto",
    headerName: "NOMBRE COMPLETO",
    headerClassName: "headerStyle",
    width: 200,

    headerAlign: "center",
    align: "center",
    sortable: true,
    editable: true,
    renderCell: renderCellFullName,
  },

  {
    field: "documentoTipo",
    headerName: "TIPO DOCUMENTO",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    width: 150,
    editable: true,
    valueParser: convertToUpperCase,
  },
  {
    field: "numeroDocumento",
    headerName: "#DOCUMENTO",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    width: 120,
    editable: true,
  },
  {
    field: "telefonoContacto",
    headerName: "TELEFONO #1",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    width: 140,
    editable: true,
  },
  {
    field: "telefonoReferencia",
    headerName: "TELEFONO #2",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    type: "number",
    width: 140,
    editable: true,
  },
  {
    field: "departamento",
    headerName: "DEPARTAMENTO",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    sortable: true,
    width: 120,
    editable: true,
    valueParser: convertToUpperCase,
  },
  {
    field: "provincia",
    headerName: "PROVINCIA",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    sortable: true,
    width: 120,
    editable: true,
    valueParser: convertToUpperCase,
  },
  {
    field: "distrito",
    headerName: "DISTRITO",
    headerClassName: "headerStyle",
    sortable: false,
    width: 120,
    editable: true,
    headerAlign: "center",
    align: "center",
    valueParser: convertToUpperCase,
  },
  {
    field: "vendedor",
    headerName: "VENDEDOR",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    sortable: true,
    width: 160,
    editable: false,
    valueParser: convertToUpperCase,
  },
  {
    field: "supervisor",
    headerName: "SUPERVISOR",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    sortable: true,
    width: 160,
    editable: false,
    valueParser: convertToUpperCase,
  },
  {
    field: "servicioTipo",
    headerName: "TIPO SERVCIO",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    sortable: true,
    width: 115,
    editable: true,
    valueParser: convertToUpperCase,
  },
  {
    field: "casaTipo",
    headerName: "TIPO CASA",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    sortable: true,
    width: 100,
    editable: true,
    valueParser: convertToUpperCase,
  },
  {
    field: "direccion",
    headerName: "DIRECCION",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    sortable: false,
    width: 160,
    editable: true,
  },
  {
    field: "observacion",
    headerName: "OBSERVACION",
    headerClassName: "headerStyle",
    headerAlign: "center",
    align: "center",
    sortable: false,
    width: 160,
    editable: true,
  },
];
