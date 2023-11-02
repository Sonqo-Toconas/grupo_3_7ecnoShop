const express = require('express');
const router = express.Router();
const path = require('path');
const userControllers = require('../controllers/userControllers');
const middleware = require('../middlewares/authMiddleware')
const multer = require('multer');
const { body } = require('express-validator')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users');
    },
    filename: (req, file, cb) => {
        let newFileName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

let fileUpload = multer({ storage: storage });

const validaciones = [
    body('nombre').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('email').isEmail().withMessage('Debes completar el campo de email'),
    body('telefono').isNumeric().withMessage('Debes completar el campo de telefono'),
    body('contrasena').notEmpty().withMessage('Debes completar el campo de contraseña')
];

router.get('/', middleware,userControllers.index);
router.get('/registro', userControllers.registro);

router.post('/registro', fileUpload.single('imagen'), userControllers.procesoCrear);
router.get('/login', userControllers.login);
router.post('/login', userControllers.processLogin);
router.get('/carrito', middleware, userControllers.carrito);

//router.post('/agregar-al-carrito/:id', productsControllers.agregarAlCarrito);

module.exports = router;