module.exports = (sequelize, dataTypes) => {
  let alias = 'Cart';

  let cols = {
    id_cart: {
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
    tableName: 'carts',
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