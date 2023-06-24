import { Schema, model } from "mongoose"

const FinancialRecordSchema = new Schema({
  ingreso: {
    type: Number
  },
  gasto: {
    type: Number
  },
  motivo: {
    type: String
  },
  total: {
    type: Number
  },

}, { timestamps: true })

export default model("Financial Records", FinancialRecordSchema)