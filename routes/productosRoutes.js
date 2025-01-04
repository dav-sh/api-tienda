const express = require('express');
const router = express.Router();
const { getProductos, createProducto, updateProducto, cambiarEstadoProducto } = require('../controllers/productosController');
const { verifyToken, authorize, roles } = require('../middleware/auth');
const validateSchema = require('../middleware/validator');
const { productSchema, statusProductSchema } = require('../schemas/productos.schema');

// Endpoints CRUD
router.get('/', verifyToken, authorize(roles.OPERADOR, roles.USUARIO), getProductos);
router.post('/', verifyToken, authorize(roles.OPERADOR), validateSchema(productSchema), createProducto);
router.put('/:id', verifyToken, authorize(roles.OPERADOR), validateSchema(productSchema), updateProducto);
router.patch('/:id', verifyToken, authorize(roles.OPERADOR), validateSchema(statusProductSchema), cambiarEstadoProducto);

module.exports = router;
