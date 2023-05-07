import { Schema, model } from "mongoose";

const ventaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  documentoTipo: {
    type: String,
    required: true
  },
  numeroDocumento: {
    type: String,
    required: true
  },
  telefonoContacto: {
    type: String,
    required: true
  },
  telefonoReferencia: {
    type: String,
  },
  departamento: {
    type: String,
    required: true
  },
  provincia: {
    type: String,
    required: true
  },
  distrito: {
    type: String,
    required: true
  },
  vendedor: {
    type: String,
    required: true
  },
  supervisor: {
    type: String,
  },
  servicioTipo: {
    type: String,
    required: true
  },
  casaTipo: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  observacion: {
    type: String,
  },
  estado: {
    type: String
  },
  id: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default model("Ventas", ventaSchema)