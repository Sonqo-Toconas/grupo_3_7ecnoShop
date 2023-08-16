const express = require('express');
const router = express.Router();

const productCartControllers = require('../controllers/productCartControllers');

router.get('/', productCartControllers.index);

module.exports = router