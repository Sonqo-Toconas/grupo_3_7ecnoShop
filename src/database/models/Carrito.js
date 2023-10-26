module.exports = (sequelize, dataTypes) => {
   
    let alias = 'Carrito';
    let cols ={
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
    };
    let config = {
        tableName: 'carrito',
        timestamps: false
      };
      
    const Carrito = sequelize.define(alias, cols, config);

    /* Carrito.associate = function(models) {
        Carrito.hasMany(models.Carrito, {
            as: "",
            foreignKey: ""
        })
    } */

    return Carrito;
}
