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
        if (req.cookies.cookieLogin) {
            [password,id] = req.cookies.cookieLogin.split('id')
        }else if (req.session.userLogin ) {
            [password,id] = req.session.userLogin.split('id')
        }
        if (req.session.userLogin || req.cookies.cookieLogin) {
            let datosDelUsuario = await db.User.findByPk(id)
            res.render('userPanel', { usuario: datosDelUsuario, product: producto, password: password})
        }
    },
    logout: (req, res) => {
        res.clearCookie('cookieLogin');
        req.session.userLogin = null;
        res.redirect('/')
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
        let {email, password, passwordRemember} = req.body;
        if (errors.isEmpty()) {
            let dataUsers = await db.User.findOne({
                where: {
                    email: email
                }
            })

            if (dataUsers) {
                let validPassword = await bcrypt.compare(password, dataUsers.password);
                if (validPassword) {
                    req.session.userLogin = `${password}id${dataUsers.id_user}`
                    req.session.admin = dataUsers.admin
                    if (passwordRemember == 'on') {
                        res.cookie('cookieLogin', `${password}id${dataUsers.id_user}`, {maxAge: 24 * 60 * 60 * 1000});
                        
                    }
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