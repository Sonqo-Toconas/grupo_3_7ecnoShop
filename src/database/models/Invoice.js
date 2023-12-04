module.exports = (sequelize, dataTypes) => {
    let alias = 'Invoice'

    let cols = {
        id_invoice: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        id_user: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        invoice_date: {
            type: dataTypes.DATE,
            allowNull: true,
            unique: true
        },
        id_product: {
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        method_pay: {
            type: dataTypes.STRING(30),
            allowNull: true
        }
    }

    let config = {
        tableName: 'invoices',
        timestamps: false
    }

    const Invoice = sequelize.define(alias, cols, config);

    Invoice.associate = function (models) {

        Invoice.belongsTo(models.User, {
            as: "usuario",
            foreignKey: "id_user",
        });

        Invoice.belongsTo(models.Product, {
            as: "producto",
            foreignKey: "id_product",
        });
    }
    return Invoice;
}