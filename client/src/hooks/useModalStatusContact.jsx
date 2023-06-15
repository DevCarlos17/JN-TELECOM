import React, { useState } from "react";

const useModalStatusContact = () => {
  const [openModalStatusContact, setModalStatusContact] = useState(false);
  const handleModalStatusContact = () =>
    setModalStatusContact(!openModalStatusContact);

  return { openModalStatusContact, handleModalStatusContact };
};

export default useModalStatusContact;
