const { DataTypes } = require("sequelize")
const sequelize = require("../config/db");

const Producto = sequelize.define("Producto", {
  idProductos: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(45), allowNull: false },
  marca: { type: DataTypes.STRING(45) },
  codigo: { type: DataTypes.STRING(45) },
  stock: { type: DataTypes.FLOAT },
  precio: { type: DataTypes.FLOAT },
  foto: { type: DataTypes.BLOB("long") },
});


// Relaciones de Producto
Producto.associate = (models) => {
  Producto.belongsTo(models.CategoriaProductos, {
    foreignKey: "CategoriaProductos_idCategoriaProductos",
    as: "categoria",
  });

Producto.belongsTo(models.Estados, {
  foreignKey: "estados_idestados",
  as: "estado",
  });

Producto.hasMany(models.OrdenDetalles, {
  foreignKey: "Productos_idProductos",
  as: "ordenDetalles",
  });

};


module.exports = Producto;
