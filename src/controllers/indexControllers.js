const db = require('../database/models');


const controller = {
    index: async (req, res) => {
        let productos = await db.Product.findAll()
        if (req.cookies.cookieLogin === undefined) {
            // Si la cookie no está definida
            return res.render('index', { productos: productos });
        } else {
            // Si la cookie está definida
            return res.render('index', { productos: productos, cookieLogin :req.cookies.cookieLogin});
        }
    },

    showAllProducts: (req, res) => {
        return res.render('producto', { productos: productos });
    }
}

module.exports = controller