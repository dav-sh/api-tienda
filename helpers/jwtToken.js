const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  console.log(user.get("idUsuarios"))
  return jwt.sign(
    {
      userId: user.get("idUsuarios"),
      roleId: user.get("rol_idRol"),
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

const validateToken = async (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (e) {
    return null;
  }
};

const decodeToken = async (token) => {
  try {
    return jwt.decode(token, process.env.SECRET_KEY);
  } catch (e) {
    return null;
  }
};

module.exports = {
  generateToken,
  validateToken,
  decodeToken,
};
