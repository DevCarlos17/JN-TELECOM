import UserStreaming from "../models/UserStreaming.js";

export const getUserStreaming = async (req, res) => {
  try {
    const users = await UserStreaming.find();
    res.send(users)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getProfilesStreaming = async (req, res) => {
  try {
    const accounts = await UserStreaming.find();

    const profiles = accounts.flatMap((account) => {
      const { plataforma, correo, contraseña, perfiles } = account;

      return perfiles
        .filter((user) => user)  // Filtra perfiles que existen
        .map((user) => ({ ...user, plataforma, correo, contraseña }));
    });


    return res.status(200).json(profiles)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createUserStreaming = async (req, res) => {
  const { body } = req;

  try {
    const newUser = new UserStreaming(body);
    await newUser.save();
    res.status(200).json({ message: "Cuenta creada con exito!", newUser, status: true })
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false })
  }

}

export const updateUserStreaming = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const updatedUserStreaming = await UserStreaming.findByIdAndUpdate(id, body, { new: true });
    if (!updatedUserStreaming) return res.status(500).json({ message: "Contacto no actualizado", status: false });
    return res.status(200).json({ message: "¡Cuenta ctualizada con éxito!", status: true, updatedUserStreaming });
  } catch (error) {
    return res.status(500).json({ error: error.message, status: false });
  }
}

export const deleteUserStreaming = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUserStream = await UserStreaming.findByIdAndDelete(id);
    if (!deletedUserStream) return res.status(404).json({ message: "Ha ocurrido un error, parece que el contacto seleccionado no existe", status: false });
    return res.status(200).json({ message: "Cuenta eliminada con exito!", contact: deletedUserStream, status: true, })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}