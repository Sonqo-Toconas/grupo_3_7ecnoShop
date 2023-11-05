const db = require('../database/models');


const controller = {
    index: async (req, res) => {
        let productos = await db.Product.findAll()

        return res.render('index', { productos: productos });
    },

    showAllProducts: (req, res) => {
        return res.render('producto', { productos: productos });
    }
}

module.exports = controller