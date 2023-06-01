import React from "react";
import { FileUpload } from "primereact/fileupload";
import { API } from "../../Config.js";
import { useSalesContext } from "../context/salesContext.jsx";

export default function AddImages({ selectedCustomer }) {
  const { uploadImages } = useSalesContext();
  const { _id } = selectedCustomer;

  const subirImagen = (e) => {
    const { files } = e;
    const data = { _id, images: files };
    uploadImages(data);
  };
  return (
    <div className="card">
      <FileUpload
        name="demo[]"
        customUpload
        uploadHandler={subirImagen}
        multiple
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
      />
    </div>
  );
}
