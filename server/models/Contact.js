import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  vendedor: {
    type: String,
  },
  telefono: {
    type: String,
  },
  etiqueta: {
    type: String
  },
  estado: {
    type: String
  },
  id: {
    type: String,
    required: false
  }
}, { timestamps: true });

export default model("Contacts", contactSchema)