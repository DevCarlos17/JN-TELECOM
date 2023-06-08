import React, { useState, useEffect } from "react";
import useFormData from "./useFormData.jsx";

const useEditModeForm = () => {
  const [editing, setEditing] = useState(false);
  const { formData, setFormData } = useFormData();
  const handleEdit = () => setEditing(!editing);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { aditional, handleTotalPay, planPackages } = useFormData();

  useEffect(() => {
    if (editing && selectedCustomer) {
      setFormData({ ...formData, ...selectedCustomer });
    }

    if (!aditional) return;
    handleTotalPay();
  }, [editing, selectedCustomer, aditional, planPackages]);

  return { editing, handleEdit, selectedCustomer, setSelectedCustomer };
};

export default useEditModeForm;
