const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController'); // Ajusta la ruta si es necesario

router.post('/', ordenController.createOrden); // Ruta para crear una orden
router.put('/:id', ordenController.updateOrden); // Ruta para actualizar una orden

module.exports = router;
