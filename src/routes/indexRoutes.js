const express = require('express');
const router = express.Router();

const indexControllers = require('../controllers/indexControllers');

router.get('/', indexControllers.index);

router.get('/productos', indexControllers.showAllProducts);

module.exports = router