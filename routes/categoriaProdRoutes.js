const express = require('express');
const router = express.Router()
const {createCategoria, updateCategoria, getCategorias, cambiarEstadoCategoria} = require('../controllers/categoriaProdController')
const {verifyToken, authorize, roles} = require('../middleware/auth')

router.get("/", verifyToken ,authorize(roles.OPERADOR, roles.USUARIO),getCategorias)
router.post("/", verifyToken ,authorize(roles.OPERADOR),createCategoria)
router.put("/:id", verifyToken, authorize(roles.OPERADOR),updateCategoria)
router.patch("/:id", verifyToken, authorize(roles.OPERADOR),cambiarEstadoCategoria)

module.exports = router