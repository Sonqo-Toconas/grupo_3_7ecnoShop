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
            type: dataTypes.STRING(100),
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

    User.associate = function (models) {
        User.hasMany(models.Cart, {
            as: "user",
            foreignKey: "user_id"
        })

        User.hasMany(models.Sold, {
            as: "sold",
            foreignKey: "user_id"
        })

        User.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'uploader_user'
        })

        User.hasMany(models.Invoice, {
            as: 'invoices',
            foreignKey: 'id_user'
        });
    }
    return User;
}