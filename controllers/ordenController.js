const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');

// Insertar una nueva orden
const createOrden = async (req, res) => {
  const { usuarios_idusuarios, estados_idestados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, detalles_orden } = req.body;

  try {
    // Convierte los detalles de la orden a JSON
    const jsonDetalles = JSON.stringify(detalles_orden);

    // Ejecuta el procedimiento almacenado
    await sequelize.query(
      'EXEC p_Insertar_Orden @usuarios_idusuarios = :usuarios_idusuarios, @estados_idestados = :estados_idestados, @nombre_completo = :nombre_completo, @direccion = :direccion, @telefono = :telefono, @correo_electronico = :correo_electronico, @fecha_entrega = :fecha_entrega, @total_orden = :total_orden, @jsonDetalles = :jsonDetalles',
      {
        replacements: {
          usuarios_idusuarios,
          estados_idestados,
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

    res.json({ message: 'Orden creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modificar una orden
const updateOrden = async (req, res) => {
    const { id } = req.params; // Obtén el ID de la orden a modificar
    const { estados_idestados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, detalles_orden } = req.body;
  
    try {
      // Convierte los detalles de la orden a JSON
      const jsonDetalles = JSON.stringify(detalles_orden);
  
      // Ejecuta el procedimiento almacenado
      await sequelize.query(
        'EXEC p_Modificar_Orden @idOrden = :id, @estados_idestados = :estados_idestados, @nombre_completo = :nombre_completo, @direccion = :direccion, @telefono = :telefono, @correo_electronico = :correo_electronico, @fecha_entrega = :fecha_entrega, @total_orden = :total_orden, @jsonDetalles = :jsonDetalles',
        {
          replacements: {
            id,
            estados_idestados,
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
  
      res.json({ message: 'Orden actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = { createOrden, updateOrden };
