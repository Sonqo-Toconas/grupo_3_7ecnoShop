const express = require('express');
const router = express.Router();

const productDetail = require('../controllers/productDetailControllers');

router.get('/detalle/:id', productDetail.index);


module.exports = router