const fs = require('fs');
const users = require('../models/users');
const path = require('path');
const usersFilePath = path.join(__dirname, '../views/users/usuarios.json')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const controller = {
    login: (req, res) => {
        res.render('login', {
            mensaje: false
        })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let usuario = users.buscarPorPropiedad('email', req.body.email)
            if (usuario) {
                let validadContra = bcrypt.compareSync(req.body.password, usuario.contraseña);
                if (validadContra) {
                    console.log('Datos correctos');
                    return res.redirect('/')
                }
                console.log('datos incorrecto')
                return res.render('login', {
                    errors: errors.array(),
                    old: req.body,
                    mensaje: 'contraseña es invalida'
                })
            } else {
                res.render('login', {
                    mensaje: 'email es invalido'
                })
            }
        }
        else {
            res.render('login', {
                errors: errors.array(),
                old: req.body,
                mensaje: false
            })
        }
    }
}

module.exports = controller