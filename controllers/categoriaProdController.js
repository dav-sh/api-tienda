const sequelize = require("../config/db");
const { QueryTypes } = require('sequelize');

const CategoriaProductos = require('../models/CategoriaProductos');


const getCategorias = async (req, res) => {
  try {
    const data = await CategoriaProductos.findAll()
    res.json(data)
  } catch (error) {
    res.json({ 'message': 'Data not found' })
  }
}



// Insertar una nueva categoría
const createCategoria = async (req, res) => {
  const { nombre, usuarios_idUsuarios, estados_idEstados } = req.body;
  try {
    // Verificar si la categoría ya existe
    const existingCategory = await CategoriaProductos.findOne({ where: { nombre } });
    if (existingCategory) {
      return res.status(409).json({ error: 'La categoría ya existe' });
    }

    await sequelize.query(
      'EXEC p_Insertar_Categoria :nombre, :usuarios_idUsuarios, :estados_idEstados',
      {
        replacements: { nombre, usuarios_idUsuarios, estados_idEstados },
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
  const { nombre, usuarios_idUsuarios, estados_idEstados } = req.body;
  try {
    await sequelize.query(
      'EXEC p_Modificar_Categoria :idCategoriaProductos, :nombre, :usuarios_idUsuarios, :estados_idEstados',
      {
        replacements: { idCategoriaProductos: id, nombre, usuarios_idUsuarios, estados_idEstados },
        type: QueryTypes.UPDATE,
      }
    );
    res.json({ message: 'Categoría actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Modificar una categoría
const cambiarEstadoCategoria = async (req, res) => {
  const { id } = req.params
  const { estados_idEstados } = req.body
  try {
    await sequelize.query(
      'EXEC p_Cambiar_Estado_Categoria :idCategoriaProductos, :estados_idEstados',
      {
        replacements: { idCategoriaProductos: id, estados_idEstados },
        type: QueryTypes.UPDATE,
      }
    );
    res.json({ message: 'Estado de Categoría actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { createCategoria, updateCategoria, getCategorias, cambiarEstadoCategoria }
