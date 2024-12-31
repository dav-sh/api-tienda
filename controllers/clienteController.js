const sequelize = require("../config/db");
const { QueryTypes } = require('sequelize');
const { Clientes} = require('../config/indexDB')


const getClientes = async (req,res) =>{
  try {
    const data = await Clientes.findAll()
    res.json(data)
  } catch (error) {
    res.json({message: 'Data not found'})
  }
}

// Insertar un nuevo cliente
const createCliente = async (req, res) => {
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;
  try {
    await sequelize.query(
      'EXEC p_Insertar_Cliente :razon_social, :nombre_comercial, :direccion_entrega, :telefono, :email',
      {
        replacements: { razon_social, nombre_comercial, direccion_entrega, telefono, email },
        type: QueryTypes.INSERT,
      }
    );
    res.json({ message: 'Cliente creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modificar un cliente
const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;
  try {
    await sequelize.query(
      'EXEC p_Modificar_Cliente :idClientes, :razon_social, :nombre_comercial, :direccion_entrega, :telefono, :email',
      {
        replacements: { idClientes: id, razon_social, nombre_comercial, direccion_entrega, telefono, email },
        type: QueryTypes.UPDATE,
      }
    );
    res.json({ message: 'Cliente actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {createCliente, updateCliente, getClientes}
