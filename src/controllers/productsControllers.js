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
    }
}

module.exports = products