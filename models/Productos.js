const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Productos = sequelize.define("Productos", {
  idProductos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: { type: DataTypes.STRING(45), allowNull: false },
  marca: { type: DataTypes.STRING(45) },
  codigo: { type: DataTypes.STRING(45) },
  stock: { type: DataTypes.FLOAT },
  precio: { type: DataTypes.FLOAT },
  foto: { type: DataTypes.BLOB("long") },
},
  {
    tableName: "Productos",
    timestamps: false,
  }
);


module.exports = Productos;
