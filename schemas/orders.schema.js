const {z} = require('zod');

const OrderSchema = z.object({
    usuarios_idUsuarios: z.number({
      required_error: 'usuarios_idUsuarios is required',
    }).int(),
    estados_idEstados: z.number({
      required_error: 'estados_idEstados is required',
    }).int(),
    nombre_completo: z.string({
      required_error: 'nombre_completo is required',
    }),
    direccion: z.string({
      required_error: 'direccion is required',
    }),
    telefono: z.string({
      required_error: 'telefono is required',
    }),
    correo_electronico: z.string().email({
      message: 'Por favor, ingresa un correo electrónico válido',
    }),
    fecha_entrega: z.string().date({
      required_error: 'fecha_entrega is required',
    }),
    total_orden: z.number({
      required_error: 'total_orden is required',
    }),
    detalles_orden: z.array(
      z.object({
        productos_idProductos: z.number({
          required_error: 'productos_idProductos is required',
        }).int(),
        cantidad: z.number({
          required_error: 'cantidad is required',
        }).int(),
        precio: z.number({
          required_error: 'precio is required',
        }),
        subtotal: z.number({
          required_error: 'subtotal is required',
        }),
      })
    ),
  });


  module.exports = OrderSchema