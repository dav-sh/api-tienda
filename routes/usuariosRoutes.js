const express = require('express')
const router = express.Router()
const {createUsuario, updateUsuario} = require('../controllers/usuariosController')


router.post("/", createUsuario)
router.put("/:id", updateUsuario)

module.exports = router
