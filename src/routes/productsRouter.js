const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers');

router.get('/', productsControllers.index);
router.get('/crear', productsControllers.mostrarFormularioCreacion);
router.post('/crear', productsControllers.crear);
router.get('/editar/:id', productsControllers.formularioEditar);
router.put('/editar/:id', productsControllers.editarProducto);
router.get('/detalle/:id', productsControllers.detalle);
router.delete('/delete/:id', productsControllers.delete);

module.exports = router;