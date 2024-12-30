const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");
const { Usuarios } = require("../models/Usuarios");
const { Estados } = require("../models/Estados");


const CategoriaProductos = sequelize.define('CategoriaProductos', {
  idCategoriaProductos: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true, //Nombre unico
  },
  usuarios_idUsuarios: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'idUsuarios',
    },
  },
  estados_idEstados: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Estados',
      key: 'idEstados',
    },
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'CategoriaProductos',
  timestamps: false,
});



module.exports = CategoriaProductos;
