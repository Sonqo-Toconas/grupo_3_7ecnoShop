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

  const Carrito = sequelize.define(alias, cols, config);

  /*   Carrito.associate = function(models) {
       Carrito.hasMany(models.Producto, {
           as: "product_id",
           foreignKey: "id_product"
       })
   },
   
   Carrito.associate = function(models) {
     Carrito.belongsTo(models.User, {
         as: "user_id",
         foreignKey: "id_user"
     })
   } */

  return Carrito;
}