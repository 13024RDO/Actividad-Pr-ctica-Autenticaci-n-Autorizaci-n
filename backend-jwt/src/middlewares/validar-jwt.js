import jwt from "jsonwebtoken";
import { variablesBd } from "../config/config.js";
import { newConnection } from "../db/database.js";

export async function verificarJwt(req, res, next) {
  const token = req.cookies.authToken || req.session.token;
  console.log(token);
  const conexion = await newConnection();

  if (!token) {
    await conexion.end();
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, variablesBd.SECRET_KEY);

    const [usuario] = await conexion.query("SELECT * FROM users WHERE id = ?", [
      decoded.userId,
    ]);
    await conexion.end();

    const user = usuario[0];

    if (!user) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = user;
    next();
  } catch (error) {
    await conexion.end();
    return res.status(500).json({ message: "Error Inesperado" });
  }
}
