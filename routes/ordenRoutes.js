const express = require('express');
const router = express.Router();
const {getOrdenes, createOrden, updateOrden, getOrdenesById} = require('../controllers/ordenController');
const { verifyToken, authorize, roles} = require('../middleware/auth');
const validateSchema = require('../middleware/validator');
const OrderSchema = require('../schemas/orders.schema');

router.get('/', verifyToken, authorize(roles.USUARIO, roles.OPERADOR), getOrdenes); 
router.get('/:id', verifyToken, authorize(roles.USUARIO, roles.OPERADOR), getOrdenesById); 
router.post('/', verifyToken, authorize(roles.USUARIO, roles.OPERADOR), validateSchema(OrderSchema),createOrden); 
router.put('/:id', verifyToken, authorize( roles.OPERADOR), validateSchema(OrderSchema), updateOrden); 

module.exports = router;
