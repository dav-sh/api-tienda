const express = require("express");
const router = express.Router();
const { createCliente, updateCliente, getClientes } = require("../controllers/clienteController");
const { verifyToken, authorize, roles } = require("../middleware/auth");
const validateSchema = require("../middleware/validator");
const clienteSchema = require("../schemas/clientes.schema");

router.get("/", verifyToken, authorize(roles.OPERADOR), getClientes);
router.post("/", verifyToken, authorize(roles.OPERADOR), validateSchema(clienteSchema), createCliente);
router.put("/:id", verifyToken, authorize(roles.OPERADOR), validateSchema(clienteSchema), updateCliente);

module.exports = router;
