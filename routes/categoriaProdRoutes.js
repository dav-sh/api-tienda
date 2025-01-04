const express = require('express');
const router = express.Router()
const {createCategoria, updateCategoria, getCategorias, cambiarEstadoCategoria} = require('../controllers/categoriaProdController')
const {verifyToken, authorize, roles} = require('../middleware/auth');
const validateSchema = require('../middleware/validator');
const { createCategoriaSchema, updateCategoriaSchema } = require('../schemas/categoria.schema');



router.get("/", verifyToken ,authorize(roles.OPERADOR, roles.USUARIO),getCategorias)
router.post("/", verifyToken ,authorize(roles.OPERADOR), validateSchema(createCategoriaSchema) ,createCategoria)
router.put("/:id", verifyToken, authorize(roles.OPERADOR), validateSchema(updateCategoriaSchema),updateCategoria)
router.patch("/:id", verifyToken, authorize(roles.OPERADOR),cambiarEstadoCategoria)

module.exports = router