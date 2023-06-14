import React, { useState } from "react";

const useModalContact = () => {
  const [openContactModal, setOpenContactModal] = useState(false);

  const handleContactModal = () => setOpenContactModal(!openContactModal);

  return { openContactModal, handleContactModal, setOpenContactModal };
};

export default useModalContact;
