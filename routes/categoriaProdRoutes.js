const express = require('express');
const router = express.Router()
const {createCategoria, updateCategoria} = require('../controllers/categoriaProdController')

router.use("/", createCategoria)
router.use("/:id", updateCategoria)

module.exports = router