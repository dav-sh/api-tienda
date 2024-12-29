const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')


const Estados = sequelize.define('Estados', {
  idestados: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'estados',
  timestamps: false,
});

module.exports = Estados;
