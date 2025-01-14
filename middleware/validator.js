const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        //console.log(req.body)
        next()
    } catch (error) {
        return res.status(400).json({ errors: error.errors.map(error=> error.message) });

    }
}

module.exports = validateSchema