const jwt = require('jsonwebtoken');
const { roles } = require('../middleware/auth'); // Importamos roles por si los necesitas para validaciones adicionales

// Generar un token (solo para pruebas)


const login = (req, res) => {
  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ error: 'Username and role are required' });
  }

  try {
    // Generar el token JWT
    const token = jwt.sign({ username, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
    console.log(token);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error generating token' });
  }
};

module.exports = {
  login,
};
