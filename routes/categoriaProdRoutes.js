const express = require('express');
const router = express.Router()
const {createCategoria, updateCategoria, getCategorias} = require('../controllers/categoriaProdController')
const {verifyToken, authorize, roles} = require('../middleware/auth')

router.get("/", verifyToken ,authorize(roles.OPERADOR),getCategorias)
router.post("/", verifyToken ,authorize(roles.OPERADOR),createCategoria)
router.put("/:id", verifyToken, authorize(roles.OPERADOR),updateCategoria)

module.exports = router