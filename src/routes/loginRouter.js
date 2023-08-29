const express = require('express');
const router = express.Router();

const loginControllers = require('../controllers/loginControllers');

router.get('/', loginControllers.login);
router.post('/', loginControllers.processLogin);


module.exports = router