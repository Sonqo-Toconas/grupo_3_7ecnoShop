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
        let producto = await db.Product.findAll()
        if (req.cookies.cookieLogin) {
            [password, id] = req.cookies.cookieLogin.split('id')
        } else if (req.session.userLogin) {
            [password, id] = req.session.userLogin.split('id')
        }

        if (req.session.userLogin || req.cookies.cookieLogin) {
            let datosDelUsuario = await db.User.findByPk(id)
            let subidoPorUsuario = await db.Product.findAll({
                where: {
                    uploader_user: datosDelUsuario.id_user
                }
            })
            let carritoUsuario = await db.Cart.findAll({
                where: {
                    user_id: datosDelUsuario.id_user
                }
            })
            let numerosCarrito = carritoUsuario.map(cart => cart.dataValues.product_id);
            let carritoFiltrados = producto.filter(producto => numerosCarrito.includes(producto.dataValues.id_product));

            let vendidoUsuario = await db.Sold.findAll({
                where: {
                    user_id: datosDelUsuario.id_user
                }
            })
            let numerosVendido = vendidoUsuario.map(sold => sold.dataValues.product_id);
            let vendidoFiltrados = producto.filter(producto => numerosVendido.includes(producto.dataValues.id_product));

            res.render('userPanel', { usuario: datosDelUsuario, upload: subidoPorUsuario, cart: carritoFiltrados, product: vendidoFiltrados, password: password })
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
        let { email, password, passwordRemember } = req.body;
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
                        res.cookie('cookieLogin', `${password}id${dataUsers.id_user}`, { maxAge: 24 * 60 * 60 * 1000 });

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
    showUsers: async (req, res) => {
        if (req.session.superAdmin) {
            let users = await db.User.findAll();
            return res.render('usersPage', { users: users })
        }
        res.redirect('/')
    },
    changeAdmin: async (req, res) => {
        let user = await db.User.findByPk(req.params.id)
        let adminChange = user.admin == 1 ? 0 : 1
        db.User.update({
            admin: adminChange
        }, {
            where: {
                id_user: req.params.id
            }
        }).then(confirm => {
            let respuesta;
            if (confirm) {
                respuesta = {
                    meta: {
                        status: 200,
                        total: confirm,
                        url: 'http://localhost:3030/usuario/users/:id'
                    },
                    data: confirm
                }
            } else {
                respuesta = {
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'http://localhost:3030/usuario/users/:id'
                    },
                    data: confirm
                }
            }
            res.json(respuesta);
        })
            .catch(error => res.send(error))

    },
    password: (req, res) => {
        res.render('changePassword', {
            msgError: {},
            oldData: false
        })
    },
    changePassword: async (req, res) => {
        let { email, password, phone } = req.body
        let errors = [
            { msg: false },
            { msg: false },
            { msg: false }
        ]
        let user = await db.User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            errors[0].msg = 'email invalido'
            return res.render('changePassword', {
                errors: errors
            })
        } else {
            if (user.phone != phone) {
                errors[1].msg = 'Telefono Invalido'
                return res.render('changePassword', {
                    errors: errors,
                    old: req.body
                })
            } else {
                if (password.length < 8) {
                    errors[2].msg = 'Contraseña debe tener 8 caracteres'
                    return res.render('changePassword', {
                        errors: errors,
                        old: req.body
                    })
                } else {
                    let hashPassword = bcrypt.hashSync(password, 10)
                    db.User.update({
                        password: hashPassword
                    }, {
                        where: {
                            email: email
                        }
                    })
                    res.redirect('/')
                }
            }
        }
    },

    userEdit: async (req, res) => {
        const oldUser = await db.User.findByPk(req.params.id);
        res.render('userEdition', { oldUser: oldUser })
    },

    processUserEdit: async (req, res) => {
        const data = req.body;
        let errors = validationResult(req)
        const oldUser = await db.User.findByPk(req.params.id);
        if (errors.isEmpty()) {
            if (req.file) {
                var userNewImage = req.file.filename
            } else {
                var userNewImage = oldUser.image
            }

            const editedUser = await db.User.update({
                name: data.name ? data.name : oldUser.name,
                email: data.email ? data.email : oldUser.email,
                phone: data.phone ? parseInt(data.phone) : oldUser.phone,
                password: data.password ? bcrypt.hashSync(data.password, 10) : oldUser.password,
                image: userNewImage,
                admin: oldUser.admin
            }, {
                where: {
                    id_user: req.params.id
                }

            })
            res.redirect("/usuario");

        } else {
            res.render('userEdition', {
                errors: errors.array(),
                old: req.body
            })
        }
    }
}

module.exports = usuario