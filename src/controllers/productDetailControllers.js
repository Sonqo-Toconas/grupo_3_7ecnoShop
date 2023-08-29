const productos = require('../views/products/productos.json')

let productDetailControllers = {
    index: (req, res) => {
        let idProducto = productos.find(producto=>{
            return req.params.id == producto.id;
        })
        res.render('productDetail',{producto:idProducto})
    }
};

module.exports = productDetailControllers;