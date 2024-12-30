const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')


const Estados = sequelize.define('Estados', {
  idEstados: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'Estados',
  timestamps: false,
});

module.exports = Estados;
