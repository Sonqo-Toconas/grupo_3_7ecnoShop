const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../views/users/usuarios.json')
const productsFilePath = path.join(__dirname, '../views/products/productos.json')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { Console } = require('console');

const usuario = {
    datos: function () {
        return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    },
    index: async (req, res) => {
        let producto = undefined
        console.log(req.session.userLogin)
        if (req.session.userLogin) {
            let datosDelUsuario = await db.User.findByPk(req.session.userLogin)
            res.render('userPanel', { usuario: datosDelUsuario, product: producto })
        }
    },

    registro: (req, res) => {
        res.render('register')
    },

    procesoCrear: async (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            const data = req.body;

            if (req.file) {
                var userImage = req.file.filename
            } else {
                var userImage = "default.png"
            }

            const users = await db.User.create({
                
                name: data.name,
                email: data.email,
                phone: parseInt(data.phone),
                password: bcrypt.hashSync(req.body.password, 10),
                image: userImage,
                admin: 0
            })

            res.redirect('/');
        }
        else {
            res.render('register', {
                errors: errors.array(),
                old: req.body
            })
        }
    },

    login: (req, res) => {
        res.render('login', {
            mensajeP: false,
            mensajeEmail: false,
        })
    },

    processLogin: async (req, res) => {

        let errors = validationResult(req)
        console.log(errors.errors);
        let {email, password} = req.body;
        if (errors.isEmpty()) {
            let dataUsers = await db.User.findOne({
                where: {
                    email: email
                }
            })

            if (dataUsers) {
                let validPassword = await bcrypt.compare(password, dataUsers.password);
                if (validPassword) {
                    req.session.userLogin = dataUsers.id_user
                    req.session.admin = dataUsers.admin
                    res.redirect('/')

                } else {
                    return res.render('login', {
                        errors: errors.array(),
                        old: req.body
                    })
                }
            } else {
                res.render('login', {
                })
            }
        } else {
            res.render('login', {
                errors: errors.errors,
                old: req.body,
            })
        }
    },
    carrito: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('productCart', { productos: productos });
    },
}
module.exports = usuario