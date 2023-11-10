module.exports = (sequelize, dataTypes) => {
    let alias = 'Color';

    let cols = {
        id_color: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: true,
            unique: true,
        }

    }


    let config = {
        tableName: 'colors',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Color = sequelize.define(alias, cols, config);

    Color.associate = function (models) {
        Color.hasMany(models.Product, {
            as: "Product",
            foreignKey: "color_id"
        })
    }

    return Color
}