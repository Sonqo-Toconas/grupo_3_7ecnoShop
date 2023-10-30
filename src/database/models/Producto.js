module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto';

    let cols = {
        id_product: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: true,
            unique: true,
        },
        description: {
            type: dataTypes.STRING(45),
            allowNull: true,
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: true,
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        color_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
        }
    }


    let config = {
        tableName: 'products',
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