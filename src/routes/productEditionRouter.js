const express = require('express');
const router = express.Router();

const productEdition = require('../controllers/productEditionControllers');

router.get('/', productEdition.index);


module.exports = router