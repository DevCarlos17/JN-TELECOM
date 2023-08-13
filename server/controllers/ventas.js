import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra"
import Venta from "../models/Venta.js"

export const getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
    res.send(ventas)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const fieldMessage = (key) => {

  switch (key.toLowerCase()) {
    case "nombrecompleto":
      return "nombre completo";

    case "documentotipo":
      return "tipo de documento";

    case "numerodocumento":
      return "numero de documento";

    case "telefonocontacto":
      return "telefono de contacto";

    case "email":
      return "Correo electronico"

    case "departamento":
      return "departamento";

    case "provincia":
      return "provincia";

    case "provincia":
      return "provincia";

    case "distrito":
      return "distrito";

    case "serviciotipo":
      return "tipo de servicio";

    case "predio":
      return "predio";

    case "coordenadas":
      return "coordenadas";

    case "adicional":
      return "adicional"

    case "paquete":
      return "paquete"

    case "mesh":
      return "cantidad de mesh"

    case "images":
      return "imagenes";

    case "direccion":
      return "direccion";

    case 'operador':
      return 'operador'

    case 'comision':
      return 'comision'
  }
}

export const createVenta = async (req, res) => {
  const { body, files } = req;

  const { numeroDocumento, aditional, plan } = body;

  //Parsed Objects
  const aditionalObj = aditional ? JSON.parse(aditional) : null;
  const planObj = plan ? JSON.parse(plan) : null;

  // Validate JSON
  if (!aditionalObj) {
    return res.status(400).json({ message: "El formato de los datos adicionales es inválido", status: false });
  }

  if (!planObj) {
    return res.status(400).json({ message: "El formato de los datos del plan es inválido", status: false });
  }


  //Validate unique sale
  const sale = await Venta.findOne({ numeroDocumento })
  if (sale) return res.status(400).json({ field: "numeroDocumento", message: "El numero de documento ya se encuentra registrado", status: false })

  //Validate inputs
  for (const key in body) {
    if (key === 'observacion' || key === "estado" || key === "telefonoReferencia") {
      continue;
    }
    if (!body[key]) {
      return res.status(400).json({ field: key, message: `El campo ${fieldMessage(key)} no puede estar vacio`, status: false })
    }
  }

  let images = [];

  if (files?.images) {
    if (Array.isArray(files.images)) {
      for (let i = 0; i < files.images.length; i++) {
        const result = await uploadImage(files.images[i].tempFilePath);
        await fs.remove(files.images[i].tempFilePath);
        images.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    } else {
      const result = await uploadImage(files.images.tempFilePath);
      await fs.remove(files.images.tempFilePath);
      images.push({
        url: result.secure_url,
        public_id: result.public_id
      });
    }
  }


  const newSale = new Venta({ ...body, aditional: aditionalObj, plan: planObj, images });
  await newSale.save();
  return res.status(200).json({ message: "Enviado con exito!", status: true })
};

export const getVenta = async (req, res) => {

  const { id } = req.params;

  try {
    const venta = await Venta.findById(id);
    if (!venta) return res.status(404)
    res.send(venta)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getSalesBySeller = async (req, res) => {
  const { username } = req.params;
  try {
    const sales = await Venta.find({ vendedor: username })
    res.send(sales)
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
}

export const getSalesBySupervisor = async (req, res) => {
  const { username } = req.params;

  try {
    const sales = await Venta.find({ supervisor: username });
    res.send(sales)
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
}

export const updateVenta = async (req, res) => {

  const { aditional, plan } = req.body;
  const { id } = req.params;


  //Parsed Objects and Updated Sale
  if (typeof aditional === "string" || typeof plan === "string") {
    const aditionalObj = JSON.parse(aditional);
    const planObj = JSON.parse(plan);

    try {
      const updatedParsedVenta = await Venta.findByIdAndUpdate(id, { ...req.body, aditional: aditionalObj, plan: planObj }, { new: true });
      console.log("Actualizada->", updatedParsedVenta);
      return res.status(200).json({ message: "Actualizada con exito!", status: true, sale: updatedParsedVenta })

    } catch (error) {
      return res.status(500).json({ error: error.message })

    }

  }

  try {
    const updatedVenta = await Venta.findByIdAndUpdate(id, { ...req.body }, { new: true });
    return res.status(200).json({ message: "Actualizada con exito!", status: true, sale: updatedVenta })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const uploadImages = async (req, res) => {
  const { params, files } = req
  const { id } = params;

  //Find Sale
  const sale = await Venta.findById(id);
  const prevImages = sale.images;

  //Upload images to Cloudinary
  const newImages = [];

  for (const key in files) {
    const result = await uploadImage(files[key].tempFilePath)
    await fs.remove(files[key].tempFilePath);
    newImages.push({
      url: result.secure_url,
      public_id: result.public_id
    });
  }

  sale.images = [...prevImages, ...newImages];

  //Save changes
  try {
    const updatedSale = await sale.save();

    return res.status(200).json({ message: "Actualizada con exito!", status: true, sale: updatedSale })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }

}

export const deleteImages = async (req, res) => {
  const { body, params, files } = req
  const { id } = params;


  const IdImageToDelete = body.images[0].public_id;

  //Delete image from Cloudinary
  try {
    const imageDeleted = await deleteImage(IdImageToDelete);
    if (imageDeleted.result === "ok") {

      const sale = await Venta.findById(id);
      const newArrayImages = sale.images.filter((img) => img.public_id !== IdImageToDelete);
      sale.images = newArrayImages
      const updatedSale = await sale.save()

      return res.status(200).json({ message: "Actualizada con exito!", status: true, sale: updatedSale })
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }


}


export const deleteVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const ventaRemoved = await Venta.findByIdAndDelete(id)

    if (!ventaRemoved) return res.status(404).json({ status: false, message: "Venta no encontrada" })

    if (ventaRemoved.images.public_id) {
      await deleteImage(ventaRemoved.images.public_id)
    }
    return res.status(200).json({ status: true, message: "Venta eliminada con exito" })
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}