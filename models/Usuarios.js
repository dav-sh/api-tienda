const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Usuarios = sequelize.define('Usuarios', {
  idUsuarios: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rol_idRol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Roles',
      key: 'idRol',
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
    type: DataTypes.STRING(75),
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
  clientes_idClientes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clientes',
      key: 'idClientes',
    },
  },
}, {
  tableName: 'Usuarios',
  timestamps: false,
});

// // Hook para encriptar la contraseña antes de guardar el usuario
// Usuarios.beforeCreate(async (user) => {
//   const rondas = 10; 
//   user.password = await bcrypt.hash(user.password, rondas);
// });


// // Sincroniza los modelos con la base de datos
// sequelize.sync({alter: true})
//   .then(() => {
//     console.log('Modelos sincronizados con la base de datos.');
//   })
//   .catch(err => {
//     console.error('Error al sincronizar modelos:', err);
//   });
module.exports = Usuarios;
