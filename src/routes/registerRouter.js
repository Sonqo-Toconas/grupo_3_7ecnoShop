const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerControllers');

router.get('/', registerController.index);

module.exports = router;