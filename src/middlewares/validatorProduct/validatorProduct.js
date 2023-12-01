const { body } = require('express-validator')
const db = require('../../database/models');
const path = require('path');
const bcrypt = require('bcryptjs');


const validatorProducts = [
    //Validación del nombre del producto.
    body('name').notEmpty().withMessage('Debe ingresar el nombre del Producto'),
    //Validación de la descripción del producto.
    body('description').notEmpty().withMessage('Debe escribir una descripcion del producto'),
    body('category').notEmpty().withMessage('Debe selecionar una categoria para su producto'),
    body('color').notEmpty().withMessage('Debe seleccionar el color del producto'),
    body('price').notEmpty().withMessage('Debe escribir el precio del producto'),
    //Validación de las imagenes del producto.
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if (!file) {
            throw new Error('Debes subir al menos una imagen del producto')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`El archivo subido no es válido. Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true;    
    }),
    
    (req, res, next) => { next()},
];
module.exports = validatorProducts;
