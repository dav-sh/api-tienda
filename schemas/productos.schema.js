const { z } = require('zod');

const productSchema = z.object({
  categoriaProductos_idCategoriaProductos: z.number({
    required_error: 'categoriaProductos_idCategoriaProductos is required',
  }).int(),
  usuarios_idUsuarios: z.number({
    required_error: 'usuarios_idUsuarios is required',
  }).int(),
  estados_idEstados: z.number({
    required_error: 'estados_idEstados is required',
  }).int(),
  nombre: z.string({
    required_error: 'nombre is required',
  }),
  marca: z.string({
    required_error: 'marca is required',
  }),
  codigo: z.string({
    required_error: 'codigo is required',
  }),
  stock: z.number({
    required_error: 'stock is required',
  }).int(),
  precio: z.number({
    required_error: 'precio is required',
  }),
  fecha_creacion: z.string().datetime({
    required_error: 'fecha_creacion is required',
  })
});


const statusProductSchema = z.object({
  idEstado: z.number({
    required_error: 'idEstado is required'
  }).int({
    required_error: 'idEstado should be a integer'
  })
})



module.exports = { productSchema, statusProductSchema }