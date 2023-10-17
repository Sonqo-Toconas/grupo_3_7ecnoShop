const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../views/products/productos.json')
const { validationResult } = require('express-validator');
const db = require('../database/models');
const Sequelize = require('sequelize')
const { where } = require('sequelize');


const products = {
    index: async (req, res) => {
        let productos = await db.Producto.findAll()
        res.render('products', { productos: productos });
    },

    buscar: async (req, res) => {
        let productos = await db.Producto.findAll({
            where: {
                name: {[Sequelize.Op.like]: `%${req.body.barra}%`}
            }
        })

        res.render('products', { productos: productos });
    },

    filtrosIndex: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let valor = req.body.order;
        switch (valor) {
            case 'mayor-precio':
                productos.sort(function (a, b) {
                    if (a.price < b.price) {
                        return 1
                    }
                    if (a.price > b.price) {
                        return -1
                    }
                    return 0
                })
                res.render('products', { productos: productos })
                break;
            case 'menor-precio':
                productos.sort(function (a, b) {
                    if (a.price > b.price) {
                        return 1
                    }
                    if (a.price < b.price) {
                        return -1
                    }
                    return 0
                })
                res.render('products', { productos: productos })
                break;
            case 'ofertas':
                let productosEnOfertas = productos.filter(producto => {
                    return producto.oferta == true
                })
                res.render('products', { productos: productosEnOfertas })
                break;
            case 'ventas':
                productos.sort(function (a, b) {
                    if (a.ventas < b.ventas) {
                        return 1
                    }
                    if (a.ventas > b.ventas) {
                        return -1
                    }
                    return -1
                })
                res.render('products', { productos: productos })
                break;
            default:
                break;
        }
    },

    delete: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const filteredProducts = productos.filter(product => {
            return product.id != req.params.id
        })
        fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, " "))
        res.redirect("/producto");
    },

    detalle: async (req, res) => {

        let data = await db.Producto.findAll({
            where: {
                idproducts: { [db.Sequelize.Op.ne]: req.params.id }
            }
        })
        let producto = await db.Producto.findByPk(req.params.id)

        res.render('productDetail', { producto: producto, otrosProductos: data })
    },

    mostrarFormularioCreacion: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('creation');
    },

    crear: async (req, res) => {
        const data = req.body;
        if (req.file) {
            var imagen = req.file.filename
        } else {
            var imagen = "producto.png"
        }

        const data2 = await db.Producto.create({
            name: data.name,
            description: data.description,
            image: imagen,
            category: data.category,
            color: data.colors,
            price: data.price
        })

        res.redirect('/');
    },

    formularioEditar: (req, res) => {
        const productos = require('../views/products/productos.json')
        let idProducto = productos.find(producto => {
            return req.params.id == producto.id;
        })
        res.render('productEdition', { producto: idProducto })
    },

    editarProducto: (req, res) => {
        const data = req.body;

        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const oldProduct = products.find(product => {
            return product.id == req.params.id
        });

        const editedProduct = {
            id: oldProduct.id,
            nombre: data.newName,
            precio: parseInt(data.price),
            descripcion: data.newDescription,
            imagen: req.file ? req.file.filename : oldProduct.imagen,
            categoria: data.category,
            color: data.colors,
        }

        const index = products.findIndex(product => {
            return product.id == req.params.id
        })

        products[index] = editedProduct;

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))

        res.redirect("/producto");
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