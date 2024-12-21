const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const Usuarios = require('../models/Usuarios'); 
const bcrypt = require('bcrypt'); 


// Insertar un nuevo usuario
const createUsuario = async (req, res) => {
  const { rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, clientes_idclientes } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existingUser = await Usuarios.findOne({ where: { correo_electronico } });
    if (existingUser) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    await sequelize.query(
      'EXEC p_Insertar_Usuario :rol_idrol, :estados_idestados, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :clientes_idclientes',
      {
        replacements: { rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, clientes_idclientes },
        type: QueryTypes.INSERT,
      }
    );
    res.json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Actualizar un usuario
const updateUsuario = async (req, res) => {
    const idusuarios = req.params.id; 
    let { rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, clientes_idclientes } = req.body;
  
    try {
      // Verifica si el usuario existe
      const user = await Usuarios.findByPk(idusuarios);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Si se proporciona una nueva contraseña, encriptarla
      if (password) {
        const saltRounds = 10;
        password = await bcrypt.hash(password, saltRounds);
      }
  
      // Actualiza el usuario en la base de datos
      await sequelize.query(
        'EXEC p_Modificar_Usuario :idusuarios, :rol_idrol, :estados_idestados, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :clientes_idclientes',
        {
          replacements: { idusuarios, rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, clientes_idclientes },
          type: QueryTypes.UPDATE,
        }
      );
  
      res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  



module.exports = {createUsuario, updateUsuario}
