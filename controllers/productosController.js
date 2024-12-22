const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');





// Obtener todos los productos
const getProductos = async (req, res) => {
  try {
    const productos = await sequelize.query('EXEC p_getProductos', {
      type: QueryTypes.SELECT,
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un producto
const createProducto = async (req, res) => {
    const {
    CategoriaProductos_idCategoriaProductos, 
    usuarios_idusuarios ,
    nombre ,
    marca ,
    codigo ,
    stock ,
    precio ,
    foto } = req.body
  try {
    await sequelize.query(
      `EXEC p_Insertar_Producto 
        :CategoriaProductos_idCategoriaProductos,     
        :usuarios_idusuarios ,
        :nombre ,
        :marca ,
        :codigo ,
        :stock ,
        :precio ,
        :foto`,
      {
        replacements: { 
            CategoriaProductos_idCategoriaProductos, 
            usuarios_idusuarios ,
            nombre ,
            marca ,
            codigo ,
            stock ,
            precio ,
            foto 
        },
        type: QueryTypes.INSERT,
      }
    );
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Actualizar un producto
const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { 
      CategoriaProductos_idCategoriaProductos, 
      usuarios_idusuarios, 
      nombre, 
      marca, 
      codigo, 
      stock, 
      precio,
      foto 
    } = req.body;
  
    try {
      await sequelize.query(
        'EXEC p_Actualizar_Producto :id, :CategoriaProductos_idCategoriaProductos, :usuarios_idusuarios, :nombre, :marca, :codigo, :stock, :precio, :foto',
        {
          replacements: { 
            id, 
            CategoriaProductos_idCategoriaProductos, 
            usuarios_idusuarios, 
            nombre, 
            marca, 
            codigo, 
            stock, 
            precio,
            foto 
          },
          type: QueryTypes.UPDATE,
        }
      );
      res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
};
