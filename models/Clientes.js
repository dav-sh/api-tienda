const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')


const Clientes = sequelize.define('Clientes', {
  idclientes: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  razon_social: {
    type: DataTypes.STRING(245),
    allowNull: false,
  },
  nombre_comercial: {
    type: DataTypes.STRING(245),
    allowNull: false,
  },
  direccion_entrega: {
    type: DataTypes.STRING(245),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'Clientes',
  timestamps: false,
});



module.exports = Clientes;
