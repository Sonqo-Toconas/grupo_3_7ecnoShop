const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../views/users/usuarios.json')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

let registerControllers = {
    index: (req, res) => {
        res.render('register')
    },

    procesoCrear: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            const data = req.body;

            if (req.file) {
                var usarImage = req.file.filename
            } else {
                var usarImage = "default.png"
            }

            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            const nuevoUser = {
                id: users[users.length - 1].id + 1,
                nombre: data.nombre,
                email: data.email,
                telefono: parseInt(data.telefono),
                contraseña: bcrypt.hashSync(req.body.contrasena, 10),
                imagen: usarImage
            }

            users.push(nuevoUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "))
            res.redirect('/');
        }
        else {
            res.render('register', {
                errors: errors.array(),
                old: req.body
            })
        }
    }
}

module.exports = registerControllers;