const express = require('express');
const router = express.Router();
const { getProductos, createProducto, updateProducto, cambiarEstadoProducto } = require('../controllers/productosController');
const { verifyToken, authorize, roles } = require('../middleware/auth');

// Endpoints CRUD
router.get('/', verifyToken, authorize(roles.OPERADOR, roles.USUARIO), getProductos);
router.post('/', verifyToken, authorize(roles.OPERADOR), createProducto);
router.put('/:id', verifyToken, authorize(roles.OPERADOR), updateProducto);
router.patch('/:id', verifyToken, authorize(roles.OPERADOR), cambiarEstadoProducto);

module.exports = router;
