const express = require("express");
const router = express.Router();
const { createEstado, updateEstado, getEstados } = require("../controllers/estadoController");
const { verifyToken, authorize, roles } = require("../middleware/auth");
const validateSchema = require("../middleware/validator");
const estadosSchema = require("../schemas/estados.schema");


router.get("/", verifyToken, authorize(roles.OPERADOR), getEstados); 
router.post("/", verifyToken, authorize(roles.OPERADOR), validateSchema(estadosSchema) ,createEstado); 
router.put("/:id", verifyToken, authorize(roles.OPERADOR), validateSchema(estadosSchema),updateEstado); 



module.exports = router;

