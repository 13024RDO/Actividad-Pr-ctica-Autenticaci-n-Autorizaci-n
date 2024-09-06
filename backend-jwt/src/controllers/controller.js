import { newConnection } from "../db/database.js";
import { generarJwt } from "../helpers/generar-jwt.js";

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const conexion = await newConnection();

    const [usuario] = await conexion.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    const user = usuario[0];

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = await generarJwt(usuario[0].id);

    console.log(req.session);
    req.session.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    return res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
}

export async function register(req, res) {
  const { username, password } = req.body;
  const conexion = await newConnection();
  try {
    const nuevoUsuario = await conexion.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );

    if (!nuevoUsuario) {
      res.json({ msg: "Error al crear el usuario" });
    } else {
      res.json(nuevoUsuario);
    }
  } catch (error) {
    console.log("Error al crear el nuevo usuario");
  }
}

export function session(req, res) {
  console.log(req.user);
  return res.json({
    message: "Acceso permitido a área protegida",
    user: req.user,
  });
}

export function logout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("authToken");
      return res.json({ message: "Cierre de sesión exitoso" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
}
