const { z } = require('zod');

const clienteSchema = z.object({
    razon_social: z.string({
        required_error: 'razon_social is required',
    }),
    nombre_comercial: z.string({
        required_error: 'nombre_comercial is required',
    }),
    direccion_entrega: z.string({
        required_error: 'direccion_entrega is required',
    }),
    telefono: z.string({
        required_error: 'telefono is required',
    }),
    email: z.string({
        required_error: 'email is required',
    }).email({
        message: 'Por favor, ingresa un correo electrónico válido',
    }),
});

module.exports = clienteSchema