const fs = require('fs')

const path = require('path')

let usuariosFunciones = {
    fileData : path.join(__dirname, '../views/users/usuarios.json'),
    datos: function(){
        return JSON.parse(fs.readFileSync(this.fileData,'utf-8'))
    },
    generadorId : function(){
        let idUsuario = this.datos().pop()
        if(idUsuario.id){
            return idUsuario.id + 1
        }
        return 1
    },
    buscarPorId : function (id){
        let usuarios = this.datos()
        let usuarioEncontrado = usuarios.find(usuario => usuario.id == id)
        return usuarioEncontrado
    },
    buscarPorPropiedad : function (propiedad, texto){
        let usuarios = this.datos()
        let usuarioEncontrado = usuarios.find(usuario => usuario[propiedad] == texto)
        return usuarioEncontrado
    },
    crearUsuario : function(datosDelUsuario) {
        let usuarios = this.datos();
        let nuevoUsuario = {
            id: this.generadorId(),
            ...datosDelUsuario
        }
        usuarios.push(nuevoUsuario);
        fs.writeFileSync(this.fileData, JSON.stringify(usuarios, null, ' '))
        return usuarios
    },
    borrarUsuario : function(id) {
        let usuarios = this.datos();
        let nuevosUsuarios = usuarios.filter(usuario => usuario.id != id);
        fs.writeFileSync(this.fileData, JSON.stringify(nuevosUsuarios, null, ' '))
        return true
    }
}

module.exports = usuariosFunciones