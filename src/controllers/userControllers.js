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
                category: data.category,
                color: data.color,
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

        if (errors.isEmpty()) {
            let dataUsers = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            })

            if (dataUsers) {
                if (bcrypt.compareSync(req.body.password, dataUsers.dataValues.password)) {
                    req.session.userLogin = dataUsers.idusers
                    req.session.admin = dataUsers.admin
                    res.redirect('/usuario')

                } else {
                    return res.render('login', {
                        errors: errors.array(),
                        old: req.body,
                        mensajeEmail: false,
                        mensajeP: 'contraseña es invalida'
                    })
                }
            } else {
                res.render('login', {
                    mensajeP: false,
                    mensajeEmail: 'email es invalido'
                })
            }
        } else {
            res.render('login', {
                errors: errors.errors,
                old: req.body,
                mensajeP: false,
                mensajeEmail: 'email es invalido'
            })
        }

    },

    carrito: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('productCart', { productos: productos });
    },
}
module.exports = usuario