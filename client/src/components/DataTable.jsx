import { useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Modal, Stack, Box } from "@mui/material";
import useModal from "../hooks/useModal.jsx";
import FormSale from "./FormSale.jsx";
import { useUserContext } from "../context/userContext.jsx";
import ModalDeInfo from "./ModalDeInfo.jsx";
import useModalViewInfo from "../hooks/useModalViewInfo.jsx";

export default function DataTable({ props }) {
  const { isOpen, handleModal } = useModal();
  const {
    salesFiltered,
    putSale,
    columns,
    seller,
    BtnEnterSale,
    CustomToolbar,
  } = props;
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const { abrir, handleAbrir } = useModalViewInfo();
  const handleCellUpdate = async (newRow, oldRow) => {
    try {
      await putSale(newRow);
      return newRow;
    } catch (error) {
      return oldRow;
    }
  };

  const isCellEditable = ({ row }) => row.resultado.toLowerCase() !== "pagada";

  return (
    <div className="bg-white p-2 rounded-xl mt-[-3rem] mb-8 h-[800px] ">
      <h1 className="text-xl mb-4 text-slate-500 font-bold">
        {seller ? `Ventas de ${seller}` : "Ventas Globales"}
      </h1>
      <Box
        sx={{
          height: "auto",
          width: "full",
          "& .headerStyle": {
            backgroundColor: "#404040",
            color: "white",
          },
        }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          {BtnEnterSale && <BtnEnterSale handleModal={handleModal} />}
        </Stack>

        <DataGrid
          onCellClick={(params, event) => {
            console.log(params.field);
            if (params.field === "direccion") {
              event.stopPropagation();
            }
          }}
          disableColumnResize={true}
          autoHeight
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 15, 20]}
          rows={salesFiltered}
          columns={columns}
          slots={{
            toolbar: CustomToolbar,
          }}
          disableSelectionOnClick
          isCellEditable={isCellEditable}
          processRowUpdate={handleCellUpdate}
        />

        <Modal
          open={isOpen}
          onClose={handleModal}
          className="flex items-center p-8 md:h-full justify-center">
          {<FormSale BtnCancel={true} handleModal={handleModal} />}
        </Modal>

        <Modal open={abrir} onClose={handleAbrir}>
          {<ModalDeInfo />}
        </Modal>
      </Box>
    </div>
  );
}
