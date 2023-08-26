import { Schema, model } from "mongoose";

const scheduledContactSchema = new Schema({
  vendedor: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true
  },
  etiqueta: {
    type: String
  },
  estado: {
    type: String
  },
  id: {
    type: String,
    required: true
  }

}, { timestamps: true });

export default model("scheduledContact", scheduledContactSchema)