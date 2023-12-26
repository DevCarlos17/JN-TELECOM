import ScheduledContact from "../models/ScheduledContact.js";

export const getScheduledContacts = async (req, res) => {
  try {

    const ScheduledContacts = await ScheduledContact.find();
    res.send(ScheduledContacts)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createScheduledContact = async (req, res) => {
  const { body } = req;
  const { telefono } = body;

  //Validate unique phone number
  const scheduledContact = await ScheduledContact.findOne({ telefono })
  if (scheduledContact) return res.status(202).json({ message: "El numero de telefono ya se encuentra registrado", status: false })

  try {
    const contact = new ScheduledContact({ ...body })
    contact.save();
    res.status(200).json({ message: "Contacto creado con exito!", contact, status: true })
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false })
  }
}

export const updateScheduledContact = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const updatedScheduledContact = await ScheduledContact.findByIdAndUpdate(id, body, { new: true });
    if (!updatedScheduledContact) return res.status(500).json({ message: "Contacto no actualizado", status: false });
    return res.status(200).json({ message: "¡Contacto actualizado con éxito!", status: true, updatedScheduledContact });
  } catch (error) {
    return res.status(500).json({ error: error.message, status: false });
  }
}

export const deleteScheduledContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedScheduledContact = await ScheduledContact.findByIdAndDelete(id);
    if (!deletedScheduledContact) return res.status(404).json({ message: "Ha ocurrido un error, parece que el contacto seleccionado no existe", status: false });
    return res.status(200).json({ message: "Contacto Eliminado con exito!", contact: deletedScheduledContact, status: true, })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}