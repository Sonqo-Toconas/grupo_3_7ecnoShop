module.exports = (sequelize, dataTypes) => {
    let alias = 'Color'

    let cols = {
        id_color: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: true
        }
    }

    let config = {
        tableName: 'colors',
        timestamps: false
    }

    const Color = sequelize.define(alias, cols, config);

    Color.associate = function (models) {
        Color.hasMany(models.Product, {
            as: "product",
            foreignKey: "color_id"
        })
    }

    return Color;
}