const express = require("express");
const router = express.Router();
const { createEstado, updateEstado, getEstados } = require("../controllers/estadoController");
const { verifyToken, authorize, roles } = require("../middleware/auth");


router.get("/", verifyToken, authorize(roles.OPERADOR), getEstados); 
router.post("/", verifyToken, authorize(roles.OPERADOR), createEstado); 
router.put("/:id", verifyToken, authorize(roles.OPERADOR), updateEstado); 



module.exports = router;

