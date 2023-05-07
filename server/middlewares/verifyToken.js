import { SECRETTOKEN } from "../config.js";
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

function veryfiToken(req, res, next) {

  const token = req.headers["auth-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "no token provided"
    })
  }

  try {
    const decoded = jwt.verify(token, SECRETTOKEN);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" })
  }


}

export default veryfiToken