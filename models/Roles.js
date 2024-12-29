const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')



const Roles = sequelize.define(
  "Roles",
  {
    idrol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(45), allowNull: false },
  },
  {
    tableName: "Roles",
    timestamps: false,
  }
);



// // Sincroniza los modelos con la base de datos
// sequelize.sync({alter: true})
//   .then(() => {
//     console.log('Modelos sincronizados con la base de datos.');
//   })
//   .catch(err => {
//     console.error('Error al sincronizar modelos:', err);
//   });

module.exports = Roles;
