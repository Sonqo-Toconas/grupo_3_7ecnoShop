const productos = require('../views/products/productos')

const controller = {
    index: (req, res) => {
        let productosDestacados = productos.filter(cel => {
            return cel.ventas >= 10;
        })
        return res.render('index', { productos: productosDestacados });
    },
    
    showAllProducts: (req, res) => {
        return res.render('producto', { productos: productos });
    }
}

module.exports = controller