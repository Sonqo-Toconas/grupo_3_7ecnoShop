const { body } = require('express-validator')
const db = require('../../database/models');
const path = require('path');
const bcrypt = require('bcryptjs');

var existingUser = null

const validacionesLogin = [
    body('email')
        .isEmail().withMessage('Debes completar el campo de email')
        .custom(async value => {
            if (value === '') {
                return true
            }
                existingUser = await db.User.findOne({
                    where : {
                        email: value
                    }
                });
                if (existingUser) {
                    return true
                }else {
                    throw new Error('email incorrecto');
                }
                
            
        }),
    body('password')
        .custom(async (value, { req }) => {
            if (value.length <= 7) {
                throw new Error('La debe contraseña tener minimo 8 caracteres');
            }else {
                if (existingUser === null) {
                    return true
                }else {
                    let validPassword = await bcrypt.compare(value, existingUser.password);
                    if (validPassword) {
                        return true
                    }
                    throw new Error('contraseña incorrecta');
                }
            }
            
        }),
        (req, res, next) => {
            next()
        },
];

module.exports = validacionesLogin