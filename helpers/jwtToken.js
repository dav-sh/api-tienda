const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  //console.log(user)
  return jwt.sign(
    {
      userId: user.get("idusuarios"),
      roleId: user.get("rol_idrol"),
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
