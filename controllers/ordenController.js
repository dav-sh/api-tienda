const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const { Ordenes, OrdenDetalles } = require('../config/indexDB')

const getOrdenes = async (req, res) => {
  try {
    console.log(Ordenes)
    // const data = await Ordenes.findAll();

    const data = await Ordenes.findAll({
      include: [{
        model: OrdenDetalles,
        as: 'ordenDetalles', // alias definido en la asociación
      }],
    });
    return res.json(data);
  } catch (error) {
    return res.status(404).json(error);
  }
}


// Actualizar el stock de productos
const updateStock = async (detalles_orden) => {
  for (const detalle of detalles_orden) {
    const { Productos_idProductos, cantidad } = detalle;
    await sequelize.query(
      'EXEC p_Actualizar_Stock_Producto @idProducto = :Productos_idProductos, @nuevoStock = :cantidad',
      {
        replacements: { Productos_idProductos, cantidad },
        type: QueryTypes.UPDATE
      }
    );
  }
};

// Insertar una nueva orden
const createOrden = async (req, res) => {
  const { usuarios_idUsuarios, estados_idEstados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, detalles_orden } = req.body;

  try {
    // Convierte los detalles de la orden a JSON
    const jsonDetalles = JSON.stringify(detalles_orden);

    // Ejecuta el procedimiento almacenado
    await sequelize.query(
      'EXEC p_Insertar_Orden @usuarios_idUsuarios = :usuarios_idUsuarios, @estados_idEstados = :estados_idEstados, @nombre_completo = :nombre_completo, @direccion = :direccion, @telefono = :telefono, @correo_electronico = :correo_electronico, @fecha_entrega = :fecha_entrega, @total_orden = :total_orden, @jsonDetalles = :jsonDetalles',
      {
        replacements: {
          usuarios_idUsuarios,
          estados_idEstados,
          nombre_completo,
          direccion,
          telefono,
          correo_electronico,
          fecha_entrega,
          total_orden,
          jsonDetalles
        },
        type: QueryTypes.INSERT
      }
    );
    await updateStock(detalles_orden);
    res.json({ message: 'Orden creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modificar una orden
const updateOrden = async (req, res) => {
  const { id } = req.params; // Obtén el ID de la orden a modificar
  const { estados_idEstados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, detalles_orden } = req.body;

  try {
    // Convierte los detalles de la orden a JSON
    const jsonDetalles = JSON.stringify(detalles_orden);

    // Ejecuta el procedimiento almacenado
    await sequelize.query(
      'EXEC p_Modificar_Orden @idOrden = :id, @estados_idEstados = :estados_idEstados, @nombre_completo = :nombre_completo, @direccion = :direccion, @telefono = :telefono, @correo_electronico = :correo_electronico, @fecha_entrega = :fecha_entrega, @total_orden = :total_orden, @jsonDetalles = :jsonDetalles',
      {
        replacements: {
          id,
          estados_idEstados,
          nombre_completo,
          direccion,
          telefono,
          correo_electronico,
          fecha_entrega,
          total_orden,
          jsonDetalles
        },
        type: QueryTypes.UPDATE
      }
    );
    await updateStock(detalles_orden);
    res.json({ message: 'Orden actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getOrdenes, createOrden, updateOrden };
