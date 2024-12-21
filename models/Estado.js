const { DataTypes } = require('sequelize');

const Estado = sequelize.define('Estado', {
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

module.exports = Estado;
