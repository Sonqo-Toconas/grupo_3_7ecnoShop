module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuario'

    let cols = {
        idusers: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        user: {
            type: dataTypes.STRING(45)
        },
        email: {
            type: dataTypes.STRING(45)
        },
        phone: {
            type: dataTypes.STRING(45)
        },
        img: {
            type: dataTypes.STRING(45)
        },
        admin: {
            type: dataTypes.STRING(45)
        },
        password: {
            type: dataTypes.STRING(45)
        }
    }

    let config = {
        tableName: 'users',
        timestamps: false
    }

    const Usuario = sequelize.define(alias, cols, config);

    /* Usuario.associate = function(models) {
        Usuario.hasMany(models.Carrito, {
            as: "carritouser",
            foreignKey: "users"
        })
    } */

    return Usuario;
}