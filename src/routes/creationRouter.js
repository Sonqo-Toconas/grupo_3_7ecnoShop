const express = require('express');
const router = express.Router();
const creationControllers = require('../controllers/creationController');

router.get('/', creationControllers.index);

module.exports = router;