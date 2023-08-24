const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../views/users/usuarios.json')

let registerController = {
    index: (req, res) => {
        res.render('register')
    },

    procesoCrear: (req, res) => {
        const data = req.body;
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const nuevoUser = {
            id: users[users.length - 1].id + 1,
            nombre: data.nombre,
            email: data.email,
            telefono: parseInt(data.telefono),
            contraseña: data.contraseña,
        }
        users.push(nuevoUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "))
        res.redirect('/');
    },
}

module.exports = registerController;