
const CategoriaProductos = require("../models/CategoriaProductos");
const Clientes = require("../models/Clientes");
const Estados = require("../models/Estados");
const { Ordenes, OrdenDetalles } = require("../models/Ordenes");
const Productos = require("../models/Productos");
const Roles = require("../models/Roles");
const Usuarios = require("../models/Usuarios");


// console.log(Clientes)
// Relaciones de CategoriaProductos
CategoriaProductos.belongsTo(Usuarios, {
  foreignKey: "usuarios_idUsuarios",
  as: "usuario",
});

CategoriaProductos.belongsTo(Estados, {
  foreignKey: "estados_idEstados",
  as: "estado",
});

CategoriaProductos.hasMany(Productos, {
  foreignKey: "CategoriaProductos_idCategoriaProductos",
  as: "productos",
});

// Relaciones de Clientes
Clientes.hasMany(Usuarios, {
  foreignKey: "clientes_idClientes",
  as: "usuarios",
});

// Relaciones de Ordenes
Ordenes.belongsTo(Usuarios, {
  foreignKey: "usuarios_idUsuarios",
  as: "usuario",
});

Ordenes.belongsTo(Estados, {
  foreignKey: "estados_idEstados",
  as: "estado",
});

Ordenes.hasMany(OrdenDetalles, {
  foreignKey: "Orden_idOrden",
  as: "ordenDetalles",
});

// Relaciones de OrdenDetalles
OrdenDetalles.belongsTo(Ordenes, {
  foreignKey: "Orden_idOrden",
  as: "orden",
});

OrdenDetalles.belongsTo(Productos, {
  foreignKey: "Productos_idProductos",
  as: "producto",
});

// Relaciones de Productos
Productos.belongsTo(CategoriaProductos, {
  foreignKey: "CategoriaProductos_idCategoriaProductos",
  as: "categoria",
});

Productos.belongsTo(Estados, {
  foreignKey: "estados_idEstados",
  as: "estado",
});

Productos.hasMany(OrdenDetalles, {
  foreignKey: "Productos_idProductos",
  as: "ordenDetalles",
});

// Relaciones de Roles
Roles.hasMany(Usuarios, {
  foreignKey: "rol_idRol",
});
// console.log(Usuarios)
// Relaciones de Usuarios
Usuarios.belongsTo(Roles, {
  foreignKey: "rol_idRol",
  as: "rol",
});

Usuarios.hasMany(Ordenes, {
  foreignKey: "usuarios_idUsuarios",
})

Usuarios.belongsTo(Estados, {
  foreignKey: "estados_idEstados",
  as: "estado",
});

Usuarios.belongsTo(Clientes, {
  foreignKey: "clientes_idClientes",
  as: "cliente",
});

module.exports = {
  CategoriaProductos,
  Clientes,
  Estados,
  Ordenes,
  OrdenDetalles,
  Productos,
  Roles,
  Usuarios,
};
