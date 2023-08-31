const express = require('express');
const router = express.Router();
const registerControllers = require('../controllers/registerControllers');
const { body } = require('express-validator')

const validaciones = [
    body('nombre').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('email').isEmail().withMessage('Debes completar el campo de email'),
    body('telefono').isNumeric().withMessage('Debes completar el campo de telefono'),
    body('contrasena').notEmpty().withMessage('Debes completar el campo de contraseña')
];

router.get('/', registerControllers.index);
router.post('/', validaciones, registerControllers.procesoCrear);


module.exports = router;