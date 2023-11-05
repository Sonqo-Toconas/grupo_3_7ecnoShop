const express = require('express');
const router = express.Router();
const path = require("path");
const productsControllers = require('../controllers/productsControllers');
const middleware = require('../middlewares/authMiddleware')
const adminPermiso = require('../middlewares/adminPermiso')
const multer = require('multer');

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
router.post('/', productsControllers.filtrosIndex);
router.get('/crear', productsControllers.mostrarFormularioCreacion);
router.post('/crear', fileUpload.single('image'), productsControllers.create);
router.get('/editar/:id', productsControllers.formularioEditar);
router.put('/editar/:id', fileUpload.single('newImage'), productsControllers.editarProducto);
router.get('/detalle/:id', productsControllers.detalle);
router.get("/producto", productsControllers.index);
router.delete('/delete/:id', middleware, adminPermiso, productsControllers.delete);


module.exports = router;