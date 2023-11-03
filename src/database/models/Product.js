module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';

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
            type: dataTypes.TEXT('medium'),
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

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        })

        Product.belongsTo(models.Color, {
            as: "color",
            foreignKey: "color_id"
        });
    }


    return Product
}