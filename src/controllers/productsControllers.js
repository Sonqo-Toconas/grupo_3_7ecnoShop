const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../views/products/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const multer = require('multer');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const Sequelize = require('sequelize')
const { where } = require('sequelize');
const { createConnection } = require('net');
const e = require('express');
const { type } = require('os');


const products = {
    index: async (req, res) => {
        let productos = await db.Product.findAll()
        res.render('products', { productos: productos });

    },

    

    search: async (req, res) => {
        console.log(req.body);

        let products = await db.Product.findAll({
            where: {
                name: { [Sequelize.Op.like]: `%${req.body.searchBar}%` }
            }
        })

        res.render('products', { productos: products });

    },

    filtrosIndex: async (req, res) => {
        if (req.params.id == 'accesorios') {
            let products = await db.Product.findAll({
                include: [
                    {
                        model: db.Category,
                        as: 'category',
                        where: {
                            name: 'Accesorios'
                        }
                    },
                ],
            });
            return res.render('products', { productos: products });
        } else if (req.params.id == 'celulares') {
            let products = await db.Product.findAll({
                include: [
                    {
                        model: db.Category,
                        as: 'category',
                        where: {
                            name: 'Celulares'
                        }
                    },
                ],
            });
            return res.render('products', { productos: products });
        }
        else {
            res.redirect('/producto')
        }

    },

    delete: function (req, res) {
        db.Product.destroy({
            where: {
                id_product: req.params.id
            }
        }).then(() => {

            res.redirect('/');
            console.log(req.params.id)
        })
            .catch(error => {
                console.log(error);
                res.status(500).send('Ha ocurrido un error al eliminar el producto');
            });
    },


    detalle: async (req, res) => {

        let data = await db.Product.findAll({
            where: {
                id_product: { [db.Sequelize.Op.ne]: req.params.id }
        
            },
            limit:4
        })
        let producto = await db.Product.findByPk(req.params.id)
        res.render('productDetail', { producto: producto, otrosProductos: data })
    },
    purchase: async (req, res) => {
        if (req.cookies.cookieLogin) {
            [password, id] = req.cookies.cookieLogin.split('id')
        } else if (req.session.userLogin) {
            [password, id] = req.session.userLogin.split('id')
        }

        let methodPay = {
            1: 'tarjeta de credito',
            2: 'Tarjeta de debito',
            3: 'Efectivo',
            4: 'Billetera virtual'
        }
        let selectedMethod = methodPay[req.body.formaDePago];

        let producto = await db.Product.findByPk(req.params.id)

        let user = await db.User.findByPk(id)
        db.Invoice.create({
            id_user: await user.id_user,
            invoice_date: new Date(),
            id_product: producto.id_product,
            method_pay: selectedMethod
        })
            .then(invoice => {
                res.render('succesBuy', { factura: invoice, nameUser: user.name })
            })
            .catch(err => {
                console.log(err);
                res.render('error')
            })
    },
    mostrarFormularioCreacion: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('creation');
    },

    create: async (req, res) => {
        const data = req.body;
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            if (req.file) {

                var productImage = req.file.filename

            } else {
                var productImage = "producto.png"
            }

            const products = await db.Product.create({
                name: data.name,
                description: data.description,
                price: data.price,
                image: productImage,
                category_id: data.category,
                color_id: data.color
            })

            res.redirect('/');
        } else {
            //si hay errores
            console.log(errors)
            res.render('creation', {
                errors: errors.array(),
                old: req.body
            })
            //y que no se suba el archivo
        }

    },

    formularioEditar: async (req, res) => {
        const oldProduct = await db.Product.findByPk(req.params.id);
        res.render("productEdition", { oldProduct: oldProduct })
    },

    editarProducto: async (req, res) => {
        const data = req.body;
        let errors = validationResult(req)
        const oldProduct = await db.Product.findByPk(req.params.id);
        if (errors.isEmpty()) {
            if (req.file) {

                var productNewImage = req.file.filename

            } else {
                var productNewImage = "producto.png"
            }
            const editedProduct = await db.Product.update({
                name: data.newName,
                description: data.newDescription,
                price: parseFloat(data.price),
                image: req.file ? productNewImage : oldProduct.image,
                category_id: data.category,
                color_id: data.colors,
            }, {
                where: {
                    id_product: req.params.id
                }

            })
            res.redirect("/");
        } else {
            res.render('productEdition', {
                errors: errors.array(),
                oldProduct: oldProduct,
                old: req.body
            })
        }
    },

    agregarAlCarrito: (req, res) => {
        const productId = req.params.id;
        const carrito = req.session.carrito || [];
        carrito.push(productId);
        req.session.carrito = carrito;
        res.redirect('/carrito');
    },

    mostrarCarrito: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const carrito = req.session.carrito || [];
        const productosEnCarrito = productos.filter(producto => {
            return carrito.includes(producto.id);
        });
        res.render('productCart', { productos: productosEnCarrito });
    }
}
module.exports = products