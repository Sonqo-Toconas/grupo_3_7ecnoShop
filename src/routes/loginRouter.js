const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');
const multer = require('multer');
const { body } = require('express-validator')
const path = require('path');


router.get('/', loginControllers.login);
router.post('/', loginControllers.processLogin);


module.exports = router