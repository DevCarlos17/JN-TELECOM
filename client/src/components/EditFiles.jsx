import React, { useEffect, useState } from "react";
import { RiUserLine } from "react-icons/ri";
import ViewerImages from "./ViewerImages.jsx";
import { useSalesContext } from "../context/salesContext.jsx";
import AddImages from "./AddImages.jsx";
import { Modal } from "@mui/material";
import useModalUploadImage from "../hooks/useModalUploadImage.jsx";
import UploadImages from "./UploadImages.jsx";

const EditFiles = ({ props }) => {
  //const { handleSaleImages, getSales, sales } = useSalesContext();
  const {
    handleSaleImages,
    getSales,
    sales,
    editMode,
    handleEditingFiles,
    selectedCustomer,
  } = props;

  const imagesUrl = selectedCustomer.images.map((img) => img.url);
  const [images, setImages] = useState(imagesUrl);
  const [newImages, setNewImages] = useState([]);
  const { isOpenUploadImages, handleIsOpenUploadImages, styleModalUploadImg } =
    useModalUploadImage();

  const handleNewImages = (e) => {
    const arrayNewImages = [...e.target.files];
    setNewImages([...newImages, ...arrayNewImages]);
  };

  const handleImg = async ({ selectedCustomer, url, index }) => {
    const newSelectedCustomer = sales.find(
      (customer) => customer.id === selectedCustomer.id
    );

    selectedCustomer = newSelectedCustomer;

    const response = await handleSaleImages({ selectedCustomer, url, index });
    if (response.data.status) {
      const arrayImagesUpdated = response.data.sale.images.map(
        (img) => img.url
      );
      setImages(arrayImagesUpdated);
      await getSales();
    }
  };

  return (
    <>
      <div className="flex justify-center bg-secondary-100 p-2 rounded-xl shadow-2xl w-[75%] lg:w-[50%]">
        {/* USER DATA*/}
        <div className=" bg-secondary-900 p-6 rounded-lg w-[100%] text-center">
          <h1 className="text-primary font-bold mb-4">
            INFORMACION DEL USUARIO
          </h1>
          <div className="">
            {Object.keys(selectedCustomer).map((key) => {
              if (
                key === "nombreCompleto" ||
                key === "documentoTipo" ||
                key === "numeroDocumento"
              ) {
                return (
                  <div className="relative">
                    <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                    <input
                      disabled
                      defaultValue={selectedCustomer[key]}
                      type="text"
                      className="py-3 pl-8 pr-4 bg-secondary-100 mb-2 w-full outline-none rounded-lg focus:border border-primary"
                    />
                  </div>
                );
              }
            })}
          </div>
          {/*IMAGES USER*/}
          <div className="">
            <h1 className="text-primary font-bold mb-4">IMAGENES</h1>
            <ViewerImages
              images={images}
              selectedCustomer={selectedCustomer}
              handleImg={handleImg}
              setImages={setImages}
              handleNewImages={handleNewImages}
            />
          </div>
          <hr className="my-6 border-gray-500/30" />
          <div className="flex justify-center gap-4">
            <button
              onClick={handleIsOpenUploadImages}
              className="bg-primary text-black uppercase font-bold text-sm min-w-min py-2 px-2 rounded hover:bg-primary/80 transition-colors">
              Agregar foto
            </button>
            <button
              onClick={handleEditingFiles}
              className="bg-primary text-black uppercase font-bold text-sm min-w-min py-2 px-2 rounded hover:bg-primary/80 transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={isOpenUploadImages}
        onClose={handleIsOpenUploadImages}
        style={styleModalUploadImg}>
        <UploadImages
          setImages={setImages}
          selectedCustomer={selectedCustomer}
          handleModal={handleIsOpenUploadImages}
        />
      </Modal>
    </>
  );
};

export default EditFiles;
