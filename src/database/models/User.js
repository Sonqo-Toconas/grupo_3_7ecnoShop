module.exports = (sequelize, dataTypes) => {
    let alias = 'User'

    let cols = {
        id_user: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: true
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: true,
            unique: true
        },
        phone: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        password: {
            type: dataTypes.STRING(45),
            allowNull: true
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: true
        },
        admin: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }

    let config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    /* User.associate = function(models) {
        User.hasMany(models.Carrito, {
            as: "user",
            foreignKey: "user_id"
        })
    } */

    return User;
}