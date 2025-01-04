const express = require('express');
const { login } = require('../controllers/authController'); 
const validateSchema = require('../middleware/validator');
const router = express.Router();
const loginSchema = require('../schemas/login.schema')

router.post('/login', validateSchema(loginSchema), login);

module.exports = router;
