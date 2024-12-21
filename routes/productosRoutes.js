const express = require("express");
const router = express.Router();
const { getProductos, createProducto, updateProducto } = require("../controllers/productosController");
//const authMiddleware = require("../middleware/authMiddleware");

// Endpoints CRUD
// router.get("/", authMiddleware, getProductos);
// router.post("/", authMiddleware, createProducto);
// router.put("/:id", authMiddleware, updateProducto);


router.get("/", getProductos);
router.post("/", createProducto);
router.put("/:id", updateProducto);

module.exports = router;
