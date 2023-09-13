const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../views/products/productos.json')

const creationController = {
    index: (req, res) => {
        res.render('creation')
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
    }
}

module.exports = creationController;