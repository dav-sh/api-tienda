const express = require('express');
const router = express.Router()
const {createCategoria, updateCategoria} = require('../controllers/categoriaProdController')
const {verifyToken, authorize, roles} = require('../middleware/auth')

router.use("/", verifyToken ,authorize(roles.OPERADOR),createCategoria)
router.use("/:id", verifyToken, authorize(roles.OPERADOR),updateCategoria)

module.exports = router