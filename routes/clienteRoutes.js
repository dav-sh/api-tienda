const express = require("express");
const router = express.Router();
const {
  createCliente,
  updateCliente
} = require("../controllers/clienteController");

router.post("/", createCliente);
router.put("/:id",   updateCliente); 

module.exports = router;
