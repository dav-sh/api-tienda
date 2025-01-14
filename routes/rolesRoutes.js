const express = require('express');
const { getRoles } = require('../controllers/rolesController');
const { verifyToken, authorize, roles } = require('../middleware/auth');
const router = express.Router()


router.get('/', verifyToken, authorize(roles.OPERADOR, roles.USUARIO) ,getRoles)


module.exports = router;