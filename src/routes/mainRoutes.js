const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');

router.get('/', mainController.index);
router.get('/carrito', mainController.carrito);
router.get('/login', mainController.login);
router.get('/producto', mainController.producto);
router.get('/registro', mainController.registro);

module.exports = router