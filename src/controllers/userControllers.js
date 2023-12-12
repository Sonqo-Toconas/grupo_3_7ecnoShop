const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../views/users/usuarios.json')
const productsFilePath = path.join(__dirname, '../views/products/productos.json')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const { Console, error } = require('console');

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

    showLogin: async (req, res) =>{
        if(req.session.userLogin = true){
            
        }
        res.render('userPanel')
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
    carrito: async (req, res) => {
        let producto = await db.Product.findAll()
        if (req.cookies.cookieLogin) {
            [password, id] = req.cookies.cookieLogin.split('id')
        } else if (req.session.userLogin) {
            [password, id] = req.session.userLogin.split('id')
        }
        let datosDelUsuario = await db.User.findByPk(id)

        let carritoUsuario = await db.Cart.findAll({
            where: {
                user_id: datosDelUsuario.dataValues.id_user
            }
            
        })
        let numerosCarrito = carritoUsuario.map(cart => cart.dataValues.product_id);
        let datosCarrito = carritoUsuario.map(cart => cart.dataValues.id_cart);
        let carritoFiltrados = producto.filter(producto => numerosCarrito.includes(producto.dataValues.id_product));
        let carrito= carritoUsuario.map(cart => cart.dataValues.amount);
        res.render('productCart', { productos: carritoFiltrados, datos: datosCarrito, cantidad:carrito});
    },
    eliminarDelCarrito: function (req, res) {
        db.Cart.destroy({
            where: {
                id_cart: req.params.id
            }
        })
            .then(() => {
                res.redirect('/usuario/carrito');
            })
    },
    cartBought: async (req, res) => {
        if (req.cookies.cookieLogin) {
            [password, id] = req.cookies.cookieLogin.split('id')
        } else if (req.session.userLogin) {
            [password, id] = req.session.userLogin.split('id')
        }
        console.log(req.body); 
        let methodPay = {
            1: 'tarjeta de credito',
            2: 'Tarjeta de debito',
            3: 'Efectivo',
            4: 'Billetera virtual'
        }
        let selectedMethod = methodPay[req.body.formaDePago];
        if (!id) {
            res.send('no existe el id')
        }else {
            try {
                let carrito = await db.Cart.findAll({
                    where :{
                        user_id : id
                    },
                    include : [
                        {
                            model: db.User,
                            as: 'user'
                        },
                        {
                            model: db.Product,
                            as: 'product'
                        }
                    ]
                })
                if (!carrito || carrito.length == 0) {
                    res.send('no tiene carrito')
                }
                    let invoiceField = []
                    let confirmCreate = []
                    for (let i = 0; i < carrito.length; i++) {
                        let confirm = await db.Sold.create({
                            user_id: carrito[i].user_id,
                            product_id : carrito[i].product_id,
                            amount : carrito[i].amount
                        })
                        confirmCreate.push(confirm.dataValues)
                        
                        let invoice = await db.Invoice.create({
                            id_user: carrito[i].user_id,
                            invoice_date: new Date(),
                            id_product: carrito[i].product_id,
                            method_pay: selectedMethod
                        })
                            invoiceField.push(invoice.dataValues)
                    }
                    
                    if (!confirmCreate) {
                        res.send('hubo errores al crear la compra')
                    }else {
                            await db.Cart.destroy({
                                where: {
                                    user_id : id
                                }
                            })
                            res.render('succesBuy',  { factura: invoiceField, nameUser: carrito[0].user.name })
                    }
                    if (!confirmCreate) {
                        res.send('hubo errores al crear la compra')
                    }
                }    
            catch (err) {
                console.log(err);
                return res.send('error')
            }
        }
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
    },
    carritoProcess: async (req,res)=>{
        if (req.cookies.cookieLogin) {
            [password, id] = req.cookies.cookieLogin.split('id')
        } else if (req.session.userLogin) {
            [password, id] = req.session.userLogin.split('id')
        }
        let idProduct = req.params.id
        let amount = req.body.amount


       db.Cart.create({
            user_id:id,
            product_id:idProduct,
            amount:amount
        })
        .then(confirm=>{
            res.redirect("/usuario/carrito")
        })
        .catch(error=>{
            console.log(error)
        })
        
    }
}

module.exports = usuario