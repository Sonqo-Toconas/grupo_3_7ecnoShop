const express = require('express');
const router = express.Router();
const path = require('path');
const userControllers = require('../controllers/userControllers');
const middleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const validationRegister = require('../middlewares/validatorUser/validatorRegister');
const validationLogin = require('../middlewares/validatorUser/validatorLogin');

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


router.get('/', middleware, userControllers.index);
router.get('/logout', middleware, userControllers.logout);
router.get('/registro', userControllers.registro);
router.post('/registro', fileUpload.single('imagen'), validationRegister, userControllers.procesoCrear);
router.get('/login', userControllers.login);
router.post('/login', validationLogin, userControllers.processLogin);
router.get('/carrito', middleware, userControllers.carrito);
router.get('/users', middleware, userControllers.showUsers);
router.patch('/users/:id', userControllers.changeAdmin);
router.get('/password', userControllers.password);
router.patch('/password', userControllers.changePassword);
router.get('/editar/:id', userControllers.userEdit);
router.post('/editar/:id', fileUpload.single('image'), userControllers.processUserEdit);


//router.post('/agregar-al-carrito/:id', productsControllers.agregarAlCarrito);

module.exports = router;