const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");


const CategoriaProductos = sequelize.define('CategoriaProductos', {
    idcategoriaProductos: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true, //Nombre unico
  },
  usuarios_idusuarios: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'idusuarios',
    },
  },
  estados_idestados: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Estados',
      key: 'idestados',
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



// Relaciones de CategoriaProductos
CategoriaProductos.associate = (models) => {
  CategoriaProductos.belongsTo(models.Usuarios, {
    foreignKey: "usuarios_idusuarios",
    as: "usuario",
  });

  CategoriaProductos.belongsTo(models.Estados, {
    foreignKey: "estados_idestados",
    as: "estado",
  });

  CategoriaProductos.hasMany(models.Producto, {
    foreignKey: "CategoriaProductos_idCategoriaProductos",
    as: "productos",
  });
};

module.exports = CategoriaProductos;
