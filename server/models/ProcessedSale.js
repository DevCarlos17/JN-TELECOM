import { Schema, model } from "mongoose";

const ProcessedSaleSchema = new Schema({
  predio: {
    type: String,
  },
  nombrePredio: {
    type: String,
  },
  presidente: {
    type: String,
  },
  administrador: {
    type: String,
  },
  direccion: {
    type: String,
  },
  distrito: {
    type: String,
  },
  supervisor: {
    type: String,
  },
  resultado: {
    type: String,
  },
  estado: {
    type: String,
  },
}, { timestamps: true })

export default model("Ventas procesadas", ProcessedSaleSchema)
//export default model("PRUEBA", ProcessedSaleSchema)