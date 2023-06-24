import Record from "../models/FinancialRecord.js"

export const getFincialRecords = async (req, res) => {
  try {
    const records = await Record.find();
    if (!records) return res.status(404).json({ status: false, message: "No se encontro ningun registro" })
    return res.send(records)
  } catch (error) {
    return res.status(404).json({ status: false, message: "Error al intentar obetener los registros financieros" })

  }
}

export const createFinancialRecord = async (req, res) => {
  const { body } = req;
  try {
    const newRecord = new Record({ ...body });
    newRecord.save()
    return res.status(200).json({ status: true, newRecord, message: "Se registro con exito!" })
  } catch (error) {
    return res.status(404).json({ status: false, message: "Error al crear el registro financiero" })
  }
}

export const updateFinancialRecord = async (req, res) => {
  const { body } = req;

  try {
    const updatedRecord = await Record.findByIdAndUpdate(body._id, body, { new: true });
    if (!updatedRecord) return res.status(500).json({ message: "Contacto no actualizado", status: false });
    return res.status(200).json({ status: true, message: "Registro Actualizado!" })
  } catch (error) {
    return res.status(400).json({ status: false, message: "Registro no actualizado!" })

  }
}

export const deleteFinancialRecord = async (req, res) => {
  const { body } = req;

  try {
    const deletedRecord = await Record.findByIdAndDelete(body._id)
    if (!deletedRecord) return res.status(404).json({ status: false, message: "El registro no pudo ser eliminado" })
    return res.status(200).json({ status: true, message: "Registro Eliminado!" })

  } catch (error) {
    return res.status(200).json({ status: false, message: "Registro no eliminado!" })

  }

}