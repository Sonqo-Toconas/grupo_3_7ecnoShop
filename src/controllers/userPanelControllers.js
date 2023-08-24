const fs = require('fs');
const path = require('path');
/* const usersFilePath = path.join(__dirname, '../views/users/usuarios.json') */

let userPanelController = {
    index: (req, res) => {
        res.render('userPanel'/* , { 'usuarios': usuarios } */)
    }
};

module.exports = userPanelController;