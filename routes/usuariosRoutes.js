const express = require('express')
const router = express.Router()
const { createUsuario, updateUsuario, getUsuarios, cambiarEstadoProducto } = require('../controllers/usuariosController')
const { verifyToken, authorize, roles } = require("../middleware/auth");
const validateSchema = require('../middleware/validator');
const { statusUsuarioSchema, usuariosSchema } = require('../schemas/usuarios.schema');

// route, middleware, roles, action
router.get("/", verifyToken, authorize(roles.OPERADOR), getUsuarios)
router.post("/", verifyToken, authorize(roles.OPERADOR), validateSchema(usuariosSchema),createUsuario)
router.put("/:id", verifyToken, authorize(roles.OPERADOR), validateSchema(usuariosSchema), updateUsuario)
router.patch("/:id", verifyToken, authorize(roles.OPERADOR), validateSchema(statusUsuarioSchema),cambiarEstadoProducto)

module.exports = router
