const { z } = require('zod'); // Correct import

const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Invalid email'
    }),
    password: z.string({
        required_error: 'Password is required'
    })
});

module.exports = loginSchema;
