const fs = require('fs');
const path = require('path');
const rutaArchivo = path.join(__dirname, '../views/products/productos.json');
const archivo = fs.readFileSync(rutaArchivo);
const productos1 = JSON.parse(archivo);

const productCart = {
  index: (req, res) => {
    return res.render('productCart');
  },

  carrito: (req, res) => {
    res.render('carrito', { productos });
  },

}

module.exports = productCart