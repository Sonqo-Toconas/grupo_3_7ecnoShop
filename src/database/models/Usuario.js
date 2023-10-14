module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario'

    let cols = {
        idusers: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        user: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        phone: {
            type: dataTypes.STRING
        },
        img: {
            type: dataTypes.STRING
        },
        admin: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        }
    }

    let config = {
        tableName: 'users',
        timestamps: false
    }

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function(models) {
        Usuario.hasMany(models.Carrito, {
            as: "carritouser",
            foreignKey: "users"
        })
    }

    return Usuario;
}