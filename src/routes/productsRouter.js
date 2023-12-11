const express = require('express');
const router = express.Router();
const path = require("path");
const productsControllers = require('../controllers/productsControllers');
const middleware = require('../middlewares/authMiddleware')
const adminPermiso = require('../middlewares/adminPermiso')
const multer = require('multer');
const validationProducts = require('../middlewares/validatorProduct/validatorProduct');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/celulares');
    },
    filename: (req, file, cb) => {
        let newFileName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

let fileUpload = multer({ storage: storage });

router.get('/', productsControllers.index);
router.post('/', productsControllers.search);
router.post('/filtro', productsControllers.filtrosIndex);
router.get('/crear', productsControllers.mostrarFormularioCreacion);
router.post('/crear', fileUpload.single('image'), validationProducts, productsControllers.create);
router.get('/editar/:id', productsControllers.formularioEditar);
router.post('/editar/:id', fileUpload.single('image'),validationProducts ,productsControllers.editarProducto);
router.get('/detalle/:id', productsControllers.detalle);
router.post('/compra/:id', middleware, productsControllers.purchase);
router.get("/producto", productsControllers.index);
router.post('/delete/:id', productsControllers.delete);
/* router.post('/producto/agregar-al-carrito/:id', productsControllers.agregarAlCarrito); */


module.exports = router;