const sequelize = require("../config/db");
const { QueryTypes } = require('sequelize');


// Insertar un nuevo estado
const createEstado = async (req, res) => {
  const { nombre } = req.body;
  try {
    await sequelize.query(
      'EXEC p_Insertar_Estado :nombre',
      {
        replacements: { nombre },
        type: QueryTypes.INSERT,
      }
    );
    res.json({ message: 'Estado creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modificar un estado
const updateEstado = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await sequelize.query(
      'EXEC p_Modificar_Estado :idestados, :nombre',
      {
        replacements: { idestados: id, nombre },
        type: QueryTypes.UPDATE,
      }
    );
    res.json({ message: 'Estado actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {createEstado, updateEstado} 
