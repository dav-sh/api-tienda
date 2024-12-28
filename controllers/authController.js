const jwt = require("jsonwebtoken");
const Usuarios = require("../models/Usuarios");
const { compare } = require("../helpers/handleBcrypt");
// Generar un token (solo para pruebas)

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  try {
    // Buscamos el usuario
    //console.log("Email recibido:", email);
    const user = await Usuarios.findOne({
      where: { correo_electronico: email },
    });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    //console.log(password)
    //console.log(user.get('password'))
    // Verificamos la contraseña
    const isPasswordValid = await compare(password, user.get('password'));
    //console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generar el token JWT
    // console.log(user.get('idusuarios'))
    // console.log( user.get('rol_idrol'))
    const token = jwt.sign(
      { userId: user.get('idusuarios'), role: user.get('rol_idrol') },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    // console.log(token);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error generating token" });
  }
};

module.exports = {
  login,
};
