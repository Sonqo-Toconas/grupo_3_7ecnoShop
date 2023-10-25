module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto';
    
    let cols = {
        id_product:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true,
        },
        name:{
            type: dataTypes.STRING(45)
        },
        description:{
            type: dataTypes.STRING(45)
        },
        image:{
            type: dataTypes.STRING(45)
        },
        category_id:{
            type: dataTypes.BIGINT(10)
        },
        color_id:{
            type: dataTypes.BIGINT(10)
        },
        price:{
            type: dataTypes.STRING(45)
        }

    }
    let config = {
        tableName: 'product',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Producto = sequelize.define(alias, cols, config);

    // Producto.associate = function(models) {

    //     Producto.belongsTo(models.Color, {
    //         as: "color",
    //         foreignKey: "color"
    //     });

    //     Producto.belongsTo(models.category, {
    //         as: "category",
    //         foreignKey: "category"
    //     })
    // }
    return Producto
}


// crear modelo productos
// crud usuarios editar
// crud productos ver detalle