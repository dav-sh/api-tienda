const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');
const { verifyToken, authorize, roles} = require('../middleware/auth')

router.post('/', verifyToken, authorize(roles.CLIENTE, roles.OPERADOR), ordenController.createOrden); 
router.put('/:id', verifyToken, authorize( roles.OPERADOR), ordenController.updateOrden); 

module.exports = router;
