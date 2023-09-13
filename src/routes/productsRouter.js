const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers');


router.get('/crear', productsControllers.mostrarFormularioCreacion);
router.post('/crear', productsControllers.crear);
router.get('/editar/:id', productsControllers.formularioEditar);
router.get('/', productsControllers.index);
router.delete('/delete/:id', productsControllers.delete);
router.get('/:id', productsControllers.detalle);

router.put('/editar/:id', productsControllers.editarProducto);

module.exports = router;