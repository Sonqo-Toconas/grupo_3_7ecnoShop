const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../views/users/usuarios.json')
const productsFilePath = path.join(__dirname, '../views/products/productos.json')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require ('../database/models')

const usuario = {
    datos: function(){
        return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    },
    index: async (req, res) => {
        let producto = undefined
        if (req.session.userLogin) {// el userLogin debe contener el id del usuario
            res.send('usted no se encuentra en la base de datos de mysql')
        }else{
            let datosDelUsuario = await db.Usuario.findByPk(req.session.userLogin)
            res.render('userPanel', {usuario: datosDelUsuario, product:producto})
        }
    },

    registro: (req, res) => {
        res.render('register')
    },

    procesoCrear: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            const data = req.body;

            if (req.file) {
                var usarImage = req.file.filename
            } else {
                var usarImage = "default.png"
            }

            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            const nuevoUser = {
                id: users[users.length - 1].id + 1,
                nombre: data.nombre,
                email: data.email,
                telefono: parseInt(data.telefono),
                contraseña: bcrypt.hashSync(req.body.contrasena, 10),
                imagen: usarImage,
                admin: false
            }

            users.push(nuevoUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "))
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

    processLogin: (req, res) => {
        let usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        let buscarPorPropiedad = function (propiedad, texto) {
            let usuarioEncontrado = usuarios.find(usuario => usuario[propiedad] == texto)
            return usuarioEncontrado
        }
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let usuario = buscarPorPropiedad('email', req.body.email)
            if (usuario) {
                let validadContra = bcrypt.compareSync(req.body.password, usuario.contraseña);
                if (validadContra) {
                    req.session.userLogin = usuario.id
                    //Para usar en el header
                    req.session.admin = usuario.admin
                    //req.session.nombre = usuario.nombre
                    //req.session.imagen = usuario.imagen
                    
                    return res.redirect('/')
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
        }
        else {
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