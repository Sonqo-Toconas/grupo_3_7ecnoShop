module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuarios'

    let colms = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
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