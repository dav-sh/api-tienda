const sequelize = require("../config/db");
const { QueryTypes } = require('sequelize');

const CategoriaProductos = require('../models/CategoriaProductos'); 



// Insertar una nueva categoría
const createCategoria = async (req, res) => {
  const { nombre, usuarios_idusuarios, estados_idestados } = req.body;
  try {
    // Verificar si la categoría ya existe
    const existingCategory = await CategoriaProductos.findOne({ where: { nombre } });
    if (existingCategory) {
      return res.status(409).json({ error: 'La categoría ya existe' });
    }

    await sequelize.query(
      'EXEC p_Insertar_Categoria :nombre, :usuarios_idusuarios, :estados_idestados',
      {
        replacements: { nombre, usuarios_idusuarios, estados_idestados },
        type: QueryTypes.INSERT,
      }
    );
    res.json({ message: 'Categoría creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modificar una categoría
const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, usuarios_idusuarios, estados_idestados } = req.body;
  try {
    await sequelize.query(
      'EXEC p_Modificar_Categoria :idcategoriaProductos, :nombre, :usuarios_idusuarios, :estados_idestados',
      {
        replacements: { idcategoriaProductos: id, nombre, usuarios_idusuarios, estados_idestados },
        type: QueryTypes.UPDATE,
      }
    );
    res.json({ message: 'Categoría actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {createCategoria, updateCategoria}
