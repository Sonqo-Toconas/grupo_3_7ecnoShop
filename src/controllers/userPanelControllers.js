const fs = require('fs');
const path = require('path');
/* const usersFilePath = path.join(__dirname, '../views/users/usuarios.json') */

let userPanelControllers = {
    index: (req, res) => {
        res.render('userPanel'/* , { 'usuarios': usuarios } */)
    }
};

module.exports = userPanelControllers;