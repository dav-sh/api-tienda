const express = require("express");
const router = express.Router();
const {createCliente, updateCliente} = require("../controllers/clienteController");
const {verifyToken, authorize, roles} = require("../middleware/auth");

router.post("/", verifyToken, authorize(roles.OPERADOR) , createCliente);
router.put("/:id", verifyToken, authorize(roles.OPERADOR), updateCliente); 

module.exports = router;
