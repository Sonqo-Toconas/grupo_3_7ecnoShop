const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../views/users/usuarios.json')

const controller = {
    login:(req,res)=>{
        return res.render('login');
    },
    processLogin:(req,res)=>{
        let users = JSON.parse(fs.readFileSync(usersFilePath,'utf-8'));
    }
}

module.exports = controller