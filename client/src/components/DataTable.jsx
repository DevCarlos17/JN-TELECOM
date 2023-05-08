import { useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import { Modal, Stack, Box } from "@mui/material";
import useModal from "../hooks/useModal.jsx";
import FormSale from "./FormSale.jsx";
import { useUserContext } from "../context/userContext.jsx";

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
  const { user } = useUserContext();

  const handleCellUpdate = async (newRow, oldRow) => {
    try {
      await putSale(newRow);
      return newRow;
    } catch (error) {
      return oldRow;
    }
  };

  const isCellEditable = ({ row }) => row.estado.toLowerCase() !== "pagada";

  return (
    <div className="bg-white p-2 rounded-xl mb-8">
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
      </Box>
    </div>
  );
}
