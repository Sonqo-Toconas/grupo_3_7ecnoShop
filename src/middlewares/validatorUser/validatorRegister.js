const { body } = require('express-validator')
const db = require('../../database/models');
const path = require('path');

const validaciones = [
    body('name')
        .isLength({ min : 2}).withMessage('El nombre debe tener minimo 2 caracteres'),
    body('email')
    .isEmail().withMessage('Debes completar el campo de email')
        .custom(async value => {

            if (value === '') {
                return true
            }
            else {
                const existingUser = await db.User.findOne({
                    where : {
                        email: value
                    }
                });
                if (existingUser) {
                    // Will use the below as the error message
                throw new Error('el email que utilizaste ya exite');
                }else {
                    return true
                }
                
            }
        }),
    body('imagen')
        .custom (( values, { req })=> {
            if (!req.file) {
                return true
            }
            let allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
            let extFile = path.extname(req.file.originalname);
            if (!allowedExtensions.includes(extFile)) {
                throw new Error('Imagen con extensión no válida');
            }
            return true;
        }),
    body('phone')   
        .isNumeric().withMessage('Debes completar el campo de telefono'),
    body('password')
        .isLength({ min : 8}).withMessage('La debe contraseña tener minimo 8 caracteres'),
    body('passwordConfirm')
        .custom((value, { req }) => {
            return value === req.body.password;
        }).withMessage('la contraseña no es la misma'),

        (req, res, next) => {
            next()
        },
];

module.exports = validaciones