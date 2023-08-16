const express = require('express');
const router = express.Router();
const creationControllers = require('../controllers/creationControllers');

router.get('/', creationControllers.creation);

module.exports = router;