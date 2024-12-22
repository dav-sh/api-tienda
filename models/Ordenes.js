const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ajusta la ruta si es necesario

const Ordenes = sequelize.define('Ordenes', {
    idOrden: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarios_idusuarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios', // Nombre del modelo de Usuarios
            key: 'idusuarios'
        }
    },
    estados_idestados: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Estados', // Nombre del modelo de Estados
            key: 'idestados'
        }
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total_orden: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

const OrdenDetalles = sequelize.define('OrdenDetalles', {
    idOrdenDetalles: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Orden_idOrden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Ordenes',
            key: 'idOrden'
        }
    },
    Productos_idProductos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Productos', // Nombre del modelo de Productos
            key: 'idProductos'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

Ordenes.hasMany(OrdenDetalles, { foreignKey: 'Orden_idOrden' });
OrdenDetalles.belongsTo(Ordenes, { foreignKey: 'Orden_idOrden' });

module.exports = { Ordenes, OrdenDetalles };
