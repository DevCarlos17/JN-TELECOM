import { Button } from "@mui/material";
import React from "react";
import useModal from "../hooks/useModal.jsx";

const BtnEnterSale = ({ handleModal }) => {
  return (
    <Button
      size="small"
      sx={{
        color: "orange",
        fontWeight: "bold",
        bgcolor: "#e9ecf0",
      }}
      onClick={handleModal}>
      Nueva Venta
    </Button>
  );
};

export default BtnEnterSale;
