const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')
const bcrypt = require('bcrypt');

const Usuarios = sequelize.define('Usuarios', {
  idusuarios: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rol_idrol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Roles',
      key: 'idrol',
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
  correo_electronico: {
    type: DataTypes.STRING(245),
    allowNull: false,
    unique: true,
  },
  nombre_completo: {
    type: DataTypes.STRING(245),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  clientes_idclientes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clientes',
      key: 'idclientes',
    },
  },
}, {
  tableName: 'Usuarios',
  timestamps: false,
});

// Hook para encriptar la contraseña antes de guardar el usuario
Usuarios.beforeCreate(async (user) => {
  const rondas = 10; 
  user.password = await bcrypt.hash(user.password, rondas);
});

module.exports = Usuarios;
