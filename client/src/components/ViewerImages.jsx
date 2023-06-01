import React, { useEffect, useState } from "react";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { TbDownload, TbTrashX } from "react-icons/tb";
import axios from "axios";

const ViewerImages = ({ selectedCustomer, images, handleImg }) => {
  const handleDownload = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      //Create Object Blob
      const blob = new Blob([response.data]);

      //Create Url from Object blob
      const url = URL.createObjectURL(blob);

      //Create link from Url
      const link = document.createElement("a");
      link.href = url;
      link.download = "image.png";
      link.click();

      //remove Objecto url
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar la imagen:", error);
    }
  };

  return (
    <RViewer imageUrls={images}>
      <div className="grid grid-cols-4 gap-2">
        {images &&
          images.map((url, index) => {
            return (
              <div
                key={index}
                className=" bg-secondary-100 rounded p-2 border hover:border-primary transition-colors">
                <h1 className="mb-4">Imagen {index + 1}</h1>
                <RViewerTrigger index={index}>
                  <div className="flex justify-center">
                    <img src={url} className="w-[150px] h-[80px]" />
                  </div>
                </RViewerTrigger>
                <div className="mt-3 flex justify-around">
                  <button
                    onClick={() => handleDownload(url)}
                    className=" hover:text-primary text-[20px] transition-colors">
                    <TbDownload />
                  </button>
                  <button
                    onClick={() => handleImg({ selectedCustomer, url })}
                    className=" hover:text-primary  text-[20px] transition-colors">
                    <TbTrashX />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </RViewer>
  );
};

export default ViewerImages;
