module.exports = (sequelize, dataTypes) => {
    let alias = 'Sold';

    let cols = {
        id_sold: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER

        },
        product_id: {
            type: dataTypes.INTEGER

        },
        amount: {
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: 'solds',
        timestamps: false
    };

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function (models) {
        Cart.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        })
        Cart.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })
    }

    return Cart;

}