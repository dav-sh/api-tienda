const {z} = require('zod');


const usuariosSchema = z.object({
    rol_idRol: z.number({
      required_error: 'rol_idRol is required',
    }).int(),
    estados_idEstados: z.number({
      required_error: 'estados_idEstados is required',
    }).int(),
    correo_electronico: z.string().email({
      message: 'Por favor, ingresa un correo electrónico válido',
    }),
    nombre_completo: z.string({
      required_error: 'nombre_completo is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    telefono: z.string({
      required_error: 'telefono is required',
    }),
    fecha_nacimiento: z.string().date({
      required_error: 'fecha_nacimiento is required',
    }),
    fecha_creacion: z.string().datetime({
      required_error: 'fecha_creacion is required',
    }),
    clientes_idClientes: z.number({
      required_error: 'clientes_idClientes is required',
    }).int(),
  });



  const statusUsuarioSchema = z.object({
    idEstado: z.number({
      required_error: 'idEstado is required',
    }).int(),
  });
module.exports = {
    usuariosSchema, statusUsuarioSchema
}