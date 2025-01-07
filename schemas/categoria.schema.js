const { z } = require('zod'); // Correct import

const createCategoriaSchema = z.object({


        nombre:  z.string({
            required_error: 'nombre is required'
        }),
        usuarios_idUsuarios: z.number({
            required_error: 'usuarios_idUsuarios is required',
        }).int(),
        estados_idEstados :z.number({
            required_error: 'estados_idEstados is required',
        }).int(),
    

    
});


const updateCategoriaSchema = z.object({

    
    nombre:  z.string({
        required_error: 'nombre is required'
    }),
    usuarios_idUsuarios: z.number({
        required_error: 'usuarios_idUsuarios is required',
    }).int(),
    estados_idEstados :z.number({
        required_error: 'estados_idEstados is required',
    }).int(),



});

module.exports = {createCategoriaSchema, updateCategoriaSchema};
