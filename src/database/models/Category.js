module.exports = (sequelize, dataTypes) => {
    let alias = 'Category'

    let cols = {
        id_category: {
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
        tableName: 'categories',
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config);

    /*    Category.associate = function (models) {
           Category.hasMany(models.Product, {
               as: "product",
               foreignKey: "category_id"
           })
       }
    */
    return Category;
}