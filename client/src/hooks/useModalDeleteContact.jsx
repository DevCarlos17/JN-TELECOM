import React, { useState } from "react";

const useModalDeleteContact = () => {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const handleModalDeleteContact = (e) => {
    setIsOpenModalDelete(!isOpenModalDelete);
  };

  return {
    isOpenModalDelete,
    handleModalDeleteContact,
  };
};

export default useModalDeleteContact;
