const fs = require('fs');
const users = require('../models/users');
const path = require('path');
const usersFilePath = path.join(__dirname, '../views/users/usuarios.json')
const bcrypt = require('bcryptjs');

const controller = {
    login:(req,res)=>{
        return res.render('login');
    },
    processLogin:(req,res)=>{
        // let usuarios = JSON.parse(fs.readFileSync(usersFilePath,'utf-8'));
        let usuario = users.buscarPorPropiedad('email', req.body.email)
        if (usuario) {
            let validadContra = bcrypt.compareSync(req.body.password, usuario.contraseña);
            if (validadContra) {
                console.log('Datos correctos');
                return res.redirect('/')
            }
            console.log('datos incorrecto')
            return res.redirect('/login')
        }

    }
}

module.exports = controller