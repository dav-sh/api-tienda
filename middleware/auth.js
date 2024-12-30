
const roles = { OPERADOR: 'OPERADOR', USUARIO: 'USUARIO' }; // Roles permitidos
const { validateToken } = require('../helpers/jwtToken');
const { Usuarios, Roles } = require("../config/indexDB"); //Modelos con relaciones creadas

// Middleware para verificar el token JWT
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(403).json({ error: 'Token not found' });
  }
  // Extraemos el token con split y lo enviamos para ser validado
  const decoded = await validateToken(token.split(' ')[1])
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  req.user = decoded; // Agrega el usuario decodificado a la solicitud
  console.log(req.user);
  next();

};

// Middleware para verificar permisos (Roles)
const authorize = (...allowedRoles) => async (req, res, next) => {
  // console.log(req.user)
  //const user = await Usuarios.findOne({where: { idusuarios: req.user.userId }})
  const role = await Usuarios.findOne({
    where: {rol_idRol: req.user.roleId },
    include: [{
      model: Roles,
      as: 'rol'
    }]
  });
  // console.log(role.rol.nombre)
  // console.log(req.user.userId)
  // console.log(allowedRoles.includes(role.rol.nombre))

  if (!req.user.userId || !allowedRoles.includes(role.rol.nombre)) {
    return res.status(403).json({ error: 'Access denied: insufficient permissions' });
  }

  next();
};

module.exports = { verifyToken, authorize, roles };
