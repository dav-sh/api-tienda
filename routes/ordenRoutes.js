const express = require('express');
const router = express.Router();
const {getOrdenes, createOrden, updateOrden} = require('../controllers/ordenController');
const { verifyToken, authorize, roles} = require('../middleware/auth')

router.get('/', verifyToken, authorize(roles.USUARIO, roles.OPERADOR), getOrdenes); 
router.post('/', verifyToken, authorize(roles.USUARIO, roles.OPERADOR), createOrden); 
router.put('/:id', verifyToken, authorize( roles.OPERADOR), updateOrden); 

module.exports = router;
