const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');
const multer = require('multer');
const { body } = require('express-validator')
const path = require('path');


const validaciones = [
    body('email').isEmail().withMessage('Debes completar el campo de email'),
    body('password').notEmpty().withMessage('Debes completar el campo de contraseña')
];


router.get('/', loginControllers.login);
router.post('/', validaciones, loginControllers.processLogin);


module.exports = router