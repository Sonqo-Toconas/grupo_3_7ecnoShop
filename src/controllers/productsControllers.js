const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../views/products/productos.json')
const { validationResult } = require('express-validator');

const products = {
    index: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('products', { productos: productos });
    },

    delete: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const filteredProducts = productos.filter(product => {
            return product.id != req.params.id
        })
        fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, " "))
        res.redirect("/producto");
    },

    detalle: (req, res) => {
        const productos = require('../views/products/productos.json')
        let idProducto = productos.find(producto => {
            return req.params.id == producto.id;
        })
        res.render('productDetail', { producto: idProducto })
    },

    mostrarFormularioCreacion: (req, res) => {
        const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('creation');
    },

    crear: (req, res) => {
        const data = req.body;

        if (req.file) {
            var imagen = req.file.filename
        } else {
            var imagen = "producto.png"
        }

        const producto = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const nuevoProducto = {
            id: producto[producto.length - 1].id + 1,
            nombre: data.name,
            descripcion: data.description,
            categoria: data.category,
            color: data.colors,
            price: data.price,
            imagen: imagen
        }

        producto.push(nuevoProducto);
        fs.writeFileSync(productsFilePath, JSON.stringify(producto, null, " "))
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

    agregarAlCarrito : (req, res) => {
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