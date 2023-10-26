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
        console.log(req.session.userLogin)
        if (req.session.userLogin) {
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
                var userImage = req.file.filename
            } else {
                var userImage = "default.png"
            }

            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            const nuevoUser = {
                id: users[users.length - 1].id + 1,
                name: data.name,
                email: data.email,
                phone: parseInt(data.phone),
                password: bcrypt.hashSync(req.body.password, 10),
                imagen: userImage,
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
    //procesoCrear: (req, res) => {
        //let errors = validationResult(req);
        //if (errors.isEmpty()) {
          //const data = req.body;
      
          //if (req.file) {
            //var usarImage = req.file.filename;
          //} else {
            //var usarImage = "default.png";
          //}
      
          //Usuario.create({
            //nombre: data.nombre,
            //email: data.email,
            //telefono: parseInt(data.telefono),
            //contraseña: bcrypt.hashSync(req.body.contrasena, 10),
            //imagen: usarImage,
            //admin: false
          //})
          //.then(() => {
            //res.redirect('/');
          //})
          //.catch(error => {
            //console.error(error);
            //res.render('register', {
             // errors: [{ msg: 'Error al crear el usuario' }],
              //old: req.body
            //});
          //});
        //} else {
          //res.render('register', {
            //errors: errors.array(),
            //old: req.body
          //});
        //}
      //},
    login: (req, res) => {
        res.render('login', {
            mensajeP: false,
            mensajeEmail: false,
        })
    },

    processLogin: async (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let dataUsers = await db.Usuario.findOne({
                where:{
                    email : req.body.email
                }
            })
            if (dataUsers) {
                // let validadContra = bcrypt.compareSync(req.body.password, dataUsers.password);
                let validarContra = req.body.password == dataUsers.password
                if (validarContra) {
                    req.session.userLogin = await dataUsers.idusers
                    req.session.admin = await dataUsers.admin
                    return res.redirect('/usuario')
                }else{
                    return res.render('login', {
                        errors: errors.array(),
                        old: req.body,
                        mensajeEmail: false,
                        mensajeP: 'contraseña es invalida'
                    })
                }
            }else{
                res.render('login', {
                    mensajeP: false,
                    mensajeEmail: 'email es invalido'
                })
            }
        }else{
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

    //verDetalleUsuario: async (req, res) => {
      //  let data = await db.Usuario.findAll({
        //    where: {
          //      idusers: { [db.Sequelize.Op.ne]: req.params.id }
            //}
       // })
        //let usuario = await db.Usuario.findByPk(req.params.id)

        //res.render('', { usuario: usuario, otrosUsuarios: data })
    //},
    //verDetalleUsuario: (req, res) => {
        //let dataPromise = db.Usuario.findAll({
          //where: {
            //idusers: { [db.Sequelize.Op.ne]: req.params.id }
          //}
        //});
      
        //let usuarioPromise = db.Usuario.findByPk(req.params.id);
      
        //Promise.all([dataPromise, usuarioPromise])
          //.then(([data, usuario]) => {
            //res.render('userPanel', { usuario: usuario, otrosUsuarios: data });
          //})
          //.catch((error) => {
            //console.error(error);
            //res.status(500).send('Error al obtener el detalle del usuario');
          //});
      //}
      
  }
module.exports = usuario