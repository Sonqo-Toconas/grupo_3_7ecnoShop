const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../views/products/productos.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { validationResult } = require('express-validator');
const db = require('../database/models');
const Sequelize = require('sequelize')
const { where } = require('sequelize');


const products = {
    index: async (req, res) => {
        let productos = await db.Product.findAll();
        if (productos) {
            res.render('products', { productos: productos });
        }else {
            res.render('products', { productos: null });
        }
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
    },

    formularioEditar: (req, res) => {
        const productos = require('../views/products/productos.json')
        let idProducto = productos.find(producto => {
            return req.params.id == producto.id;
        })
        res.render('productEdition', { producto: idProducto })
    },

    editarProducto: async (req, res) => {
        const data = req.body;

        //const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        //const oldProduct = products.find(product => {
          //  return product.id == req.params.id
        //});

        db.Product.findByPk(req.params.id)
        .then(function(oldProduct){
            res.render("ProductEdition",
            {oldProduct : oldProduct})
        })
        
        const editedProduct = await db.Product.update({
        //id: oldProduct.id
            nombre: data.newName,
            precio: parseInt(data.price),
            descripcion: data.newDescription,
            imagen: req.file ? req.file.filename : oldProduct.imagen,
            categoria: data.category,
            color: data.colors,
        },{
            where: {
                id : req.params.id
            }
        })

        //const index = products.findIndex(product => {
          //  return product.id == req.params.id
        //})

        //products[index] = editedProduct;

        //fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))

        //where : {

        //}
        res.redirect("/producto/" + req.params.id);
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