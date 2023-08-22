const productos = require('../views/products/productos')

const controller = {
    index:(req,res)=>{
        return res.render('index');
    },
    showAllProducts:(req,res)=>{
        return res.render('producto', { productos : productos});
    }
}

module.exports = controller