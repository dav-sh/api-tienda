const express = require("express");
const router = express.Router();
const { createEstado, updateEstado } = require("../controllers/estadoController");
const { verifyToken, authorize, roles } = require("../middleware/auth");


router.post("/", verifyToken, authorize(roles.OPERADOR), createEstado); 
router.put("/:id", verifyToken, authorize(roles.OPERADOR), updateEstado); 



module.exports = router;

