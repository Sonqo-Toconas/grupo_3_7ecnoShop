const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers');
const middleware = require('../middlewares/authMiddleware')
const adminPermiso = require('../middlewares/adminPermiso')

router.get('/', productsControllers.index);
router.post('/', productsControllers.filtrosIndex);
router.get('/crear', productsControllers.mostrarFormularioCreacion);
router.post('/crear', productsControllers.crear);
router.get('/editar/:id', productsControllers.formularioEditar);
router.put('/editar/:id', productsControllers.editarProducto);
router.get('/detalle/:id', productsControllers.detalle);
router.delete('/delete/:id', middleware, adminPermiso,productsControllers.delete);

module.exports = router;