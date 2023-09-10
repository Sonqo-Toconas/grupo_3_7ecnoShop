const fs = require('fs');


const obtenerProductos = () => {
  const rutaArchivo = path.join(__dirname, '../views/productos/productos.json');
  const archivo = fs.readFileSync(rutaArchivo);
  const productos = JSON.parse(archivo);
  return productos;
};

const carrito = (req, res) => {
  const productos = obtenerProductos().productos;

  res.render('carrito', { productos });
};

const productCart = {
    index:(req,res)=>{
        return res.render('productCart');
    }
}

module.exports = productCart