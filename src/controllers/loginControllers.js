const fs = require('fs');
const users = require('../models/users');
const path = require('path');
const usersFilePath = path.join(__dirname, '../views/users/usuarios.json')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { error } = require('console');



const controller = {
    login:(req,res)=>{
        res.render('login', {
            mensajeP: false,
            mensajeEmail: false,
        })
    },
    processLogin:(req,res)=>{
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let usuario = users.buscarPorPropiedad('email', req.body.email)
            if (usuario) {
                let validadContra = bcrypt.compareSync(req.body.password, usuario.contraseña);
                if (validadContra) {
                    return res.redirect('/')
                }else{
                    return  res.render('login', {
                        errors: errors.array(),
                        old: req.body,
                        mensajeEmail:false,
                        mensajeP: 'contraseña es invalida'
                    })
                }
            }else{
                res.render('login', {
                    mensajeP: false,
                    mensajeEmail: 'email es invalido'
                })
            }
        }
        else {
            res.render('login', {
                errors: errors.errors,
                old: req.body,
                mensajeP: false,
                mensajeEmail: 'email es invalido'
            })
        }
    }
}

module.exports = controller