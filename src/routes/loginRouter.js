const express = require('express');
const router = express.Router();

const loginControllers = require('../controllers/loginControllers');

router.get('/', loginControllers.login);


module.exports = router