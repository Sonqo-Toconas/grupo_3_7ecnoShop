const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');
const path = require('path')

console.log("Vamos")

const sessionUser = {
    //Lee la lista de usuarios
    //filename: '../views/users/usuarios.json',
    filename: path.join(__dirname, '../views/users/usuarios.json'),
    //Convierte la lista en array
    getData: function () {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    },
    //Busca un usuario
    //findByPk: function(){
      //  let allUsers = getData();
        //let userFound = allUsers.find(oneUser => oneUser.id)
        //return userFound;
    //},
    //Busca un usuario por email
    findByField: function(email, emailUser){
        let allUsers = getData();
        let userFound = allUsers.find(oneUser[email] === emailUser)
        return userFound;
    },
    //Login del usuario desde el header
    

}

let userLog = function (req, res, next) {
    
        let userId = req.session.nombre;
    return userId;


    //mostrar iniciar sesion
    //mostrar la imagen y nombre de usuario
    //next();
}
console.log(sessionUser.login());
module.exports = headerMiddleware;