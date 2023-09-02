const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../views/users/productos.json')

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
        res.redirect("/productos");
    },
    detalle: (req, res) => {
        const productos = require('../views/products/productos.json')
        let idProducto = productos.find(producto=>{
            return req.params.id == producto.id;
        })
        res.render('productDetail',{producto:idProducto})
    }
}

module.exports = products