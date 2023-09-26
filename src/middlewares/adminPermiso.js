const fs = require('fs')
const path = require('path')
const models = require('../models/users')

const adminPermiso = (req, res, next) => {
    let usuario = models.buscarPorId(req.session.userLogin)
    if (usuario.admin) {
        next()
    }else{
        res.send('no sos admin pa')
    }
};

module.exports = adminPermiso