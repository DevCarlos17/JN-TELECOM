import { useState } from "react";

const useModalUpdatedSale = () => {
  const [isOpenModalUpdatedSale, setIsOpenModalUpdatedSale] = useState(false);
  const [statusUpdated, setStatusUpdated] = useState(null);

  const handleModalUpdatedSale = () =>
    setIsOpenModalUpdatedSale(!isOpenModalUpdatedSale);

  return {
    isOpenModalUpdatedSale,
    handleModalUpdatedSale,
    statusUpdated,
    setStatusUpdated,
  };
};

export default useModalUpdatedSale;
