const {z} = require('zod');

const estadosSchema = z.object({
    nombre: z.string({
        required_error: 'nombre is required'
    }
    )
})

module.exports = estadosSchema