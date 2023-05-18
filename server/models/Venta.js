import { Schema, model } from "mongoose";

const ventaSchema = new Schema({
  nombreCompleto: {
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
  email: {
    type: String,
    required: true
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
  predio: {
    type: String,
    required: true
  },
  coordenadas: {
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
  images: {
    type: Object
  },
  estado: {
    type: String
  },
  resultado: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  plan: {
    megas: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    velocity: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  aditional: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },

  mesh: {
    type: Number,
  },
  pagoTotal: {
    type: Number,
    required: true
  }

}

  , { timestamps: true })

export default model("Ventas", ventaSchema)