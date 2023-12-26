import Contact from "../models/Contact.js"

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createContact = async (req, res) => {
  const { body } = req;
  const { telefono } = body;

  //Validate unique phone number
  const contact = await Contact.findOne({ telefono })
  if (contact) return res.status(202).json({ message: "El numero de telefono ya se encuentra registrado", status: false })

  try {
    const contact = new Contact({ ...body })
    contact.save();
    res.status(200).json({ message: "Contacto creado con exito!", contact, status: true })
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false })

  }

}

export const updateContact = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!updatedContact) return res.status(500).json({ message: "Contacto no actualizado", status: false });
    return res.status(200).json({ message: "¡Contacto actualizado con éxito!", status: true, updatedContact });
  } catch (error) {
    return res.status(500).json({ error: error.message, status: false });
  }
}

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) return res.status(404).json({ message: "Ha ocurrido un error, parece que el contacto seleccionado no existe", status: false });
    return res.status(200).json({ message: "Contacto eliminado corractamente", contact: deletedContact, status: true, })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}