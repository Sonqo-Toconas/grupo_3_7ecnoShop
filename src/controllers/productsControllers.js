const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../views/products/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const multer = require('multer');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const Sequelize = require('sequelize')
const { where } = require('sequelize');


const products = {
    index: async (req, res) => {
        let productos = await db.Product.findAll()
        res.render('products', { productos: productos });

    },
    //indexx: (req,res) => {
    //let phone = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../products/productos.json")));
    // res.render(path.resolve(__dirname, "../views/products/productos"), {phone})
    // }, 

    search: async (req, res) => {
        let products = await db.Product.findAll({
            where: {
                name: { [Sequelize.Op.like]: `%${req.body.barra}%` }
            }
        })

        res.render('products', { productos: products });
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
        Producto.destroy({
            where: {
                id_product: req.params.id
            }
        }).then(() => {
            res.redirect('/producto');
        }).catch(error => {
            console.log(error);
            res.status(500).send('Ha ocurrido un error al eliminar el producto');
        });
    },

    detalle: async (req, res) => {

        let data = await db.Product.findAll({
            where: {
                id_product: { [db.Sequelize.Op.ne]: req.params.id }
            }
        })
        let producto = await db.Product.findByPk(req.params.id)

        console.log(producto)
        res.render('productDetail', { producto: producto, otrosProductos: data })
    },

    mostrarFormularioCreacion: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('creation');
    },

    create: async (req, res) => {
        const data = req.body;


        //usar multer para el nombre de la imagen
        //nombre del producto + tipocolor + id_ascendente + jpg/png
        //SamsungA4Azul01.jpg
        if (req.file ) {
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
    },

    formularioEditar: async (req, res) => {
        const oldProduct = await db.Product.findByPk(req.params.id);
        res.render("productEdition", { oldProduct: oldProduct })
    },

    editarProducto: async (req, res) => {

        let errors = validationResult(req)
        if (errors.isEmpty()) {
            const data = req.body;

            const oldProduct = await db.Product.findByPk(req.params.id);

            const editedProduct = await db.Product.update({
                name: data.newName,
                description: data.newDescription,
                price: parseInt(data.price),
                image: req.file ? req.file.filename : oldProduct.image,
                category_id: data.category,
                color_id: data.colors,
            }, {
                where: {
                    id_product: req.params.id
                }

            })
            res.redirect("/producto/detalle/" + oldProduct.id_product);
        } else {
            res.render('productEdition', {
                errors: errors.array(),
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