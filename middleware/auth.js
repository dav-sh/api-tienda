const jwt = require('jsonwebtoken');
const roles = { OPERADOR: 'OPERADOR', CLIENTE: 'CLIENTE' }; // Roles permitidos

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY); // Verifica el token
    req.user = decoded; // Agrega el usuario decodificado a la solicitud
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware para verificar roles
const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied: insufficient permissions' });
  }
  next();
};

module.exports = { verifyToken, authorize, roles };
