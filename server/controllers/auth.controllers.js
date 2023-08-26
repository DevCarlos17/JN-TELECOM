import User from "../models/User.js"
import jsonwebtoken from "jsonwebtoken"
import { SECRETTOKEN } from "../config.js"
import schemaRegister from "./validateRegister.js";
import schemaSignin from "./validateSignin.js";

const jwt = jsonwebtoken;

export const signup = async (req, res, next) => {
  //Validate register

  const { username, email, password, password2, rol, supervisor } = req.body;

  // Unique email validation
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    return res.status(400).json({ field: "email", error: "El email ya se encuentra registrado", auth: false, token: null, })
  }


  //Unique username validation
  const isUsernameExist = await User.findOne({ username });
  if (isUsernameExist) {
    return res.status(400).json({ field: "username", error: "El nombre de usuario ya se encuentra registrado", auth: false, token: null, })
  }

  //validate password
  if (password !== password2) {
    return res.status(400).json({ field: "password", error: "Ambas contraseñas no coinciden", auth: false, token: null, })
  }

  //Validate rol
  if (rol === "rol") {
    return res.status(400).json({ field: "isAdmin", error: "Debe seleccionar un rol", auth: false, token: null, })
  }

  //Validate supervisor
  if (supervisor === "Supervisor a cargo") {
    return res.status(400).json({ field: "supervisor", error: "Debe seleccionar un supervisor", auth: false, token: null, })
  }

  try {

    const newUser = new User(req.body);

    // hash contraseña
    newUser.password = await newUser.encryptPassword(newUser.password);
    await newUser.save();

    /*
    const token = jwt.sign({ id: newUser._id }, SECRETTOKEN, {
      expiresIn: 60 * 60 * 24
    })
  */
    return res.status(200).json({ auth: true })

  } catch (error) {
    res.status(400).json({ error })
  }

}

export const auth = async (req, res, next) => {

  const user = await User.findById(req.userId, { password: 0 })

  if (!user) return res.status(404).send("No user found")


  return res.json(user)
}

export const signin = async (req, res, next) => {

  const { email, password } = req.body;

  //Validate email
  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ field: "email", error: "Email no registrado", auth: false, token: null, })

  //Validate password
  const validPassword = await user.validatePassword(password);
  if (!validPassword) return res.status(400).json({ field: "password", error: "Contraseña invalida", auth: false, token: null, })

  const token = jwt.sign({ id: user._id }, SECRETTOKEN, {
    expiresIn: 60 * 60 * 24 * 30
  })

  return res.json({ auth: true, token })
}

export const getUser = async (req, res, next) => {

  try {
    const { userId } = req;
    const user = await User.findById(userId);
    res.send(user)
  } catch (error) {
    return res.status(404).json({ error })
  }
}

export const getDashboard = (req, res, next) => {
  res.send("dashboard")
}

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await User.find({ rol: "EMPLEADO" })
    res.send(employees)

  } catch (error) {
    return res.status(404).json({ error })
  }
}

export const getSupervisors = async (req, res, next) => {
  try {
    const employees = await User.find({ rol: "SUPERVISOR" })
    res.send(employees)
  } catch (error) {
    return res.status(404).json({ error })
  }
}

export const changeCanSeeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado!", status: false });
    }

    user.canSeeContact = !user.canSeeContact
    await user.save();

    return res.status(200).json({ message: "Usuario actualizado!", status: true });
  } catch (error) {
    console.error("Error al actualizar el canSeeContact del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor", status: false });
  }
};

export const changeCanSeeScheduledContact = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado!", status: false });
    }

    user.canSeeScheduledContact = !user.canSeeScheduledContact
    await user.save();

    return res.status(200).json({ message: "Usuario actualizado!", status: true });
  } catch (error) {
    console.error("Error al actualizar el canSeeContact del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor", status: false });
  }
};