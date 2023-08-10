const express = require('express');
const router = express.Router();

const productCartController = require('../controllers/productsCartControllers');

router.get('/', productCartController.carrito);


module.exports = router