const fs =  require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../views/products/productos.json');

const products = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
        res.render("index", { product: products }); 
    }
};

const userPanel = {
    index: (req, res) => {
        res.render('userPanel');
    }
}

module.exports = userPanel