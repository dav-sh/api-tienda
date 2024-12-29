const express = require('express')
const router = express.Router()
const { createUsuario, updateUsuario, getUsuarios } = require('../controllers/usuariosController')
const { verifyToken, authorize, roles } = require("../middleware/auth");

// route, middleware, roles, action
router.get("/", verifyToken, authorize(roles.OPERADOR), getUsuarios)
router.post("/", verifyToken, authorize(roles.OPERADOR), createUsuario)
router.put("/:id", verifyToken, authorize(roles.OPERADOR), updateUsuario)

module.exports = router
