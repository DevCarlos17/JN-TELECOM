import ProcessedSale from "../models/ProcessedSale.js"

export const getProcessedSales = async (req, res) => {

  try {
    const processedSales = await ProcessedSale.find();
    if (!processedSales) return res.status(404).json({ status: false, message: "No se encontro ningun registro" })
    return res.send(processedSales)
  } catch (error) {
    return res.status(404).json({ status: false, message: "Error al intentar obetener las ventas procesadas" })
  }

}

export const createProcessedSale = async (req, res) => {
  const { body } = req;
  try {
    const newProcessedSale = new ProcessedSale({ ...body });
    newProcessedSale.save();
    return res.status(200).json({ status: true, newProcessedSale, message: "Se registro con exito!" })
  } catch (error) {
    return res.status(404).json({ status: false, message: "Error al intentar registrar la venta", error })

  }
}

export const updateProcessedSale = async (req, res) => {
  const { body } = req;

  try {
    const updatedProcessedSale = await ProcessedSale.findByIdAndUpdate(body._id, body, { new: true });
    if (!updatedProcessedSale) return res.status(404).json({ status: false, message: "Venta no actualizada" })
    return res.status(200).json({ status: true, message: "Venta actualizada con exito", updateProcessedSale })
  } catch (error) {
    return res.status(404).json({ status: false, message: "Error al actualizar la venta", error })
  }
}

export const deleteProcessedSale = async (req, res) => {
  const { body } = req;

  try {
    const deletedProcessedSale = await ProcessedSale.findByIdAndDelete(body._id);
    if (!deletedProcessedSale) return res.status(404).json({ status: false, message: "La venta no pudo ser eliminada" })
    return res.status(200).json({ status: true, message: "Registro Eliminado!" })
  } catch (error) {
    return res.status(404).json({ status: false, message: "Error al intentar elimnar la venta", error })
  }
}
