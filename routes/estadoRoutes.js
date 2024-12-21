const express = require("express");
const router = express.Router();
const { createEstado, updateEstado } = require("../controllers/estadoController");

router.post("/", createEstado); 
router.put("/:id", updateEstado); 



module.exports = router;

