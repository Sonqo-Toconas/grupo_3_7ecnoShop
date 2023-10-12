module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto';
    let cols = {
        idproducts:{
            type: dataTypes.INTEGER,
            primaryKey: true
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
        category:{
            type: dataTypes.INTEGER
        },
        color:{
            type: dataTypes.INTEGER
        },
        price:{
            type: dataTypes.STRING(45)
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
    return Producto
}


// crear modelo productos
// crud usuarios editar
// crud productos ver detalle