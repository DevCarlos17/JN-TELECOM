import React, { useState } from "react";

const useModalUploadImage = () => {
  const [isOpenUploadImages, setIsOpenUploadImages] = useState(false);

  const handleIsOpenUploadImages = () =>
    setIsOpenUploadImages(!isOpenUploadImages);

  const styleModalUploadImg = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return { isOpenUploadImages, handleIsOpenUploadImages, styleModalUploadImg };
};

export default useModalUploadImage;
