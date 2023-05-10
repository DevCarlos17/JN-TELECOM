import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra"
import Venta from "../models/Venta.js"
import schemaVentas from "../controllers/validateVentas.js";

export const getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
    res.send(ventas)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createVenta = async (req, res) => {
  const { body, files } = req;
  const { numeroDocumento } = body;

  //Validate unique sale
  const sale = await Venta.findOne({ numeroDocumento })
  if (sale) return res.status(400).json({ field: "numeroDocumento", error: "El numero de documento ya se encuentra registrado", status: false })

  //Validate inputs
  for (const key in body) {
    if (key === 'observacion') {
      continue;
    }
    if (!body[key]) {
      return res.status(400).json({ field: key, error: `El campo ${key} no puede estar vacio`, status: false })
    }
  }

  let images = [];

  if (files.images) {
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

  const newSale = new Venta({ ...body, images });
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

export const updateVenta = async (req, res) => {

  try {
    const { id } = req.params;
    const ventaFound = await Venta.findById(id);
    const { estado } = ventaFound;
    const updatedVenta = await Venta.findByIdAndUpdate(id, { ...req.body, estado }, { new: true })
    return res.send(updatedVenta)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateVentaByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVenta = await Venta.findByIdAndUpdate(id, req.body, { new: true });
    return res.send(updatedVenta);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}


export const deleteVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const ventaRemoved = await Venta.findByIdAndDelete(id)

    if (!ventaRemoved) return res.status(404)

    if (ventaRemoved.imagenes.public_id) {
      await deleteImage(ventaRemoved.imagenes.public_id)
    }
    return res.status(204)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}