import { Schema, model } from "mongoose";

const UserStreamingSchema = new Schema({
  numero: {
    type: String,
  },
  precio: {
    type: String,
  },
  plataforma: {
    type: String,
  },
  correo: {
    type: String,
  },
  contraseña: {
    type: String,
  },
  perfiles: [{
    vencimiento: {
      type: Date,
    },
    numero: {
      type: String,
    },
    perfil: {
      type: String,
    },
    pin: {
      type: String,
    },
    precio: {
      type: String,
    },
    renovacion: {
      type: String,
    },
  }],
  pin: {
    type: String,
  },
  vencimiento: {
    type: String,
  },
  renovacion: {
    type: String,
  },
}, { timestamps: true });

export default model("Streaming", UserStreamingSchema);
