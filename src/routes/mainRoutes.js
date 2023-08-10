const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainControllers');
const productCartController = require('../controllers/productsCartControllers');
const loginController = require('../controllers/loginControllers');
const productDetailController = require('../controllers/productDetailController');

router.get('/', mainController.index);

module.exports = router